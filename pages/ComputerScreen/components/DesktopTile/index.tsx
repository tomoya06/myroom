import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { globalContext } from "../../context";
import { AppInfo } from "../../interface";
import { $tileSize } from "../../variables";
import "./index.scss";
import { TileLiveContent } from "./interface";

export interface TileBasicProps {
  appInfo: AppInfo;
  size: "middle" | "wide" | "large";
  pos: [number, number];
  color?: string;
}

export interface DesktopTileProps extends TileBasicProps {
  lives?: TileLiveContent[];
  liveInt?: number;
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
  const { color = "w3-win8-cyan", size } = props;
  const style: React.CSSProperties = {};
  if (live.bg) {
    style.backgroundImage = `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("${live.bg}")`;
    style.backgroundSize = "cover";
  }
  return (
    <div
      className={classNames(
        "LiveTile",
        color,
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
    color = "w3-win8-cyan",
    size,
    lives = [],
    pos,
    liveInt = 5000,
    appInfo,
  } = props;
  const { openApp } = globalContext;

  const [lastLive, setLastLive] = useState<TileLiveContent>();
  const [curLive, setCurLive] = useState<TileLiveContent>();
  const [curLiveOut, setCurLiveOut] = useState<boolean>();
  const interval = useRef<number>();
  const curLiveStore = useRef<TileLiveContent>();
  const curLiveIdx = useRef<number>();

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
  };

  useEffect(() => {
    clearInterval(interval.current);
    resetLive();

    interval.current = setInterval(() => {
      if (curLiveIdx.current! >= lives.length - 1) {
        resetLive();
        props.onLoopEnd?.();

        return;
      }
      curLiveIdx.current = curLiveIdx.current! + 1;
      updateLive(lives[curLiveIdx.current]);
    }, liveInt);
  }, [lives]);

  const style: React.CSSProperties = {
    left: `calc(${pos[0]} * ${$tileSize})`,
    top: `calc(${pos[1]} * ${$tileSize})`,
  };

  const handleClick = () => {
    openApp?.(appInfo.id);
  };

  if (!appInfo) {
    return <></>;
  }

  return (
    <div
      className={classNames("DesktopTile", size, color)}
      onClick={handleClick}
      style={style}
    >
      {size !== "middle" && WideTileTitle(appInfo)}
      {size === "middle" && MiddleTileTitle(appInfo)}
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
