import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { installedAppToMap } from "../../apps/installed";
import { globalContext } from "../../context";
import { AppInfo } from "../../interface";
import { $defaultThemeColor, $tileSize } from "../../variables";
import "./index.scss";
import { TileLiveContent } from "./interface";
import delayfunc from "delay";

const $AnimateInDuration = 1800;
const $AnimateOutDuration = 1000;

export interface TileBasicProps {
  appInfo: AppInfo;
  size: "middle" | "wide" | "large";
  titleSize?: "middle";
  pos: [number, number];
  color?: string;
}

export interface DesktopTileProps extends TileBasicProps {
  lives?: TileLiveContent[];
  liveInt?: number;
  delay?: number;
  children?: JSX.Element;
  onLoopEnd?: () => void;
}

const WideTileTitle = (myapp: AppInfo) => {
  return (
    <div className={classNames("DesktopTileIconBox", "wide")}>
      <img className="DesktopTileIcon" src={myapp.icon} alt={myapp.id} />
      <div className="DesktopTileNameWide">{myapp.id}</div>
    </div>
  );
};

const MiddleTileTitle = (myapp: AppInfo) => {
  return (
    <>
      <div className={classNames("DesktopTileIconBox", "middle")}>
        <img className="DesktopTileIcon" src={myapp.icon} alt={myapp.id} />
      </div>
      <div className="DesktopTileName">{myapp.id}</div>
    </>
  );
};

const LiveTile = (
  myapp: AppInfo,
  live: TileLiveContent,
  props: DesktopTileProps,
  css: {
    out?: boolean;
    in?: boolean;
  }
) => {
  const { size } = props;
  const style: React.CSSProperties = {};
  if (live.bg) {
    style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)), url("${live.bg}")`;
    style.backgroundSize = "cover";
  }
  return (
    <div
      className={classNames(
        "LiveTile",
        live.color || myapp.color || $defaultThemeColor,
        size,
        css.out && "out",
        css.in && "in"
      )}
      style={style}
      key={live.id}
    >
      <div className="LiveTileMain">
        {live.title && <div className="LiveTileTitle">{live.title}</div>}
        {live.content && <div className="LiveTileContent">{live.content}</div>}
        {live.elem}
      </div>
      <div className="LiveTileFooter">
        <img className="LiveTileFooterIcon" src={myapp.icon} alt={myapp.id} />
        <div className="LiveTileFooterId">{myapp.id}</div>
      </div>
    </div>
  );
};

const DesktopTile: React.FC<DesktopTileProps> = (props: DesktopTileProps) => {
  const {
    size,
    titleSize,
    lives = [],
    pos,
    liveInt = 5000,
    delay,
    appInfo,
  } = props;
  const { openApp } = globalContext;

  const [lastLive, setLastLive] = useState<TileLiveContent>();
  const [curLive, setCurLive] = useState<TileLiveContent>();
  const [curLiveOut, setCurLiveOut] = useState<boolean>();
  const interval = useRef<number>();
  const curLiveStore = useRef<TileLiveContent>();
  const curLiveIdx = useRef<number>();
  const liveIteHash = useRef<number>(0);

  const clickable = useMemo(() => {
    return !!installedAppToMap[appInfo.id].content;
  }, []);

  const updateLive = (live: TileLiveContent) => {
    setCurLiveOut(false);
    setLastLive(curLiveStore.current);
    setCurLive(live);
    curLiveStore.current = live;
  };

  const resetLive = () => {
    curLiveIdx.current = -1;
    curLiveStore.current = undefined;
    setLastLive(undefined);
    setCurLiveOut(true);
    clearInterval(interval.current);
  };

  const iterateLive = () => {
    if (curLiveIdx.current! >= lives.length - 1) {
      resetLive();
      props.onLoopEnd?.();

      delayfunc($AnimateOutDuration).then(() => {
        // 重新开始一轮interval
        startIterateLive(liveIteHash.current);
      });

      return;
    }
    curLiveIdx.current = curLiveIdx.current! + 1;
    updateLive(lives[curLiveIdx.current]);
  };

  const startIterateLive = async (hash: number) => {
    if (hash !== liveIteHash.current) {
      return;
    }
    await delayfunc(delay || liveInt);

    if (hash !== liveIteHash.current) {
      return;
    }
    iterateLive();

    interval.current = setInterval(() => {
      iterateLive();
    }, liveInt + $AnimateOutDuration);
  };

  useEffect(() => {
    liveIteHash.current += 1;
    resetLive();

    if (lives.length === 0) {
      return () => {
        clearInterval(interval.current);
      };
    }

    startIterateLive(liveIteHash.current);

    return () => {
      clearInterval(interval.current);
    };
  }, [lives]);

  const style: React.CSSProperties = {
    left: `calc(${pos[0]} * ${$tileSize})`,
    top: `calc(${pos[1]} * ${$tileSize})`,
  };

  const handleClick = () => {
    if (!clickable) {
      return;
    }
    openApp?.(appInfo.id);
  };

  if (!appInfo) {
    return <></>;
  }

  const useMiddleTitle = (() => {
    if (size === "middle" || titleSize === "middle") {
      return true;
    }
    return false;
  })();

  return (
    <div
      className={classNames(
        "DesktopTile",
        size,
        appInfo.color || $defaultThemeColor,
        clickable && "clickable"
      )}
      onClick={handleClick}
      style={style}
    >
      {useMiddleTitle ? MiddleTileTitle(appInfo) : WideTileTitle(appInfo)}

      {lastLive && LiveTile(appInfo, lastLive, props, {})}
      {curLive &&
        LiveTile(appInfo, curLive, props, {
          out: curLiveOut,
          in: !curLiveOut,
        })}
    </div>
  );
};

export default DesktopTile;
