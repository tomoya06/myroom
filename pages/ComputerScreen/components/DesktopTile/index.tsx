import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { AppContext } from "../../context";
import { AppApp } from "../../interface";
import "./index.scss";
import { TileLiveContent } from "./interface";

const $tileSize = `10.5rem`;

interface Props {
  appid: string;
  size: "middle" | "wide" | "large";
  pos: [number, number];
  color?: string;
  lives?: TileLiveContent[];
  liveInt?: number;
  children?: JSX.Element;
}

const WideTileTitle = (myapp: AppApp) => {
  return (
    <div className={classNames("DesktopTileIconBox", "wide")}>
      <img className="DesktopTileIcon" src={myapp.icon} alt={myapp.id} />
      <div className="DesktopTileNameWide">{myapp.id}</div>
    </div>
  );
};

const MiddleTileTitle = (myapp: AppApp) => {
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
  myapp: AppApp,
  live: TileLiveContent,
  props: Props,
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
      </div>
    </div>
  );
};

const DesktopTile: React.FC<Props> = (props: Props) => {
  const {
    appid,
    color = "w3-win8-cyan",
    size,
    lives = [],
    pos,
    liveInt = 5000,
  } = props;

  const [lastLive, setLastLive] = useState<TileLiveContent>();
  const [curLive, setCurLive] = useState<TileLiveContent>();
  const [curLiveOut, setCurLiveOut] = useState<boolean>();
  const interval = useRef<number>();
  const prevLive = useRef<TileLiveContent>();
  const curLiveIdx = useRef<number>();

  const updateLive = (live: TileLiveContent | undefined, out?: boolean) => {
    if (out) {
      prevLive.current = undefined;
      setLastLive(undefined);
      setCurLiveOut(out);
      return;
    }
    setCurLiveOut(false);
    setLastLive(prevLive.current);
    setCurLive(live);
    prevLive.current = live;
  };

  useEffect(() => {
    clearInterval(interval.current);
    curLiveIdx.current = -1;

    interval.current = setInterval(() => {
      if (curLiveIdx.current! >= lives.length - 1) {
        updateLive(undefined, true);
        curLiveIdx.current = -1;
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

  return (
    <AppContext.Consumer>
      {(context) => {
        const { apps = {}, openApp } = context || {};
        const myapp = apps[appid];

        const handleClick = () => {
          openApp?.(appid);
        };

        if (!myapp) {
          return <></>;
        }

        return (
          <div
            className={classNames("DesktopTile", size, color)}
            onClick={handleClick}
            style={style}
          >
            {size !== "middle" && WideTileTitle(myapp)}
            {size === "middle" && MiddleTileTitle(myapp)}
            {lastLive && LiveTile(myapp, lastLive, props, {})}
            {curLive &&
              LiveTile(myapp, curLive, props, {
                out: curLiveOut,
                in: !curLiveOut,
              })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default DesktopTile;
