import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { AppContext } from "../../context";
import { AppApp } from "../../interface";
import "./index.scss";
import { TileLiveContent } from "./interface";

interface Props {
  appid: string;
  size: "middle" | "wide" | "large";
  color?: string;
  lives?: TileLiveContent[];
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

const LiveTile = (myapp: AppApp, live: TileLiveContent, props: Props) => {
  const { color = "w3-win8-cyan", size } = props;
  let style: React.CSSProperties = {};
  if (live.bg) {
    style = {
      backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url("${live.bg}")`,
      backgroundSize: "cover",
    };
  }
  return (
    <div
      className={classNames("LiveTile", color, size)}
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
  const { appid, color = "w3-win8-cyan", size, lives = [] } = props;

  const [lastLive, setLastLive] = useState<TileLiveContent>();
  const [curLive, setCurLive] = useState<TileLiveContent>();
  const interval = useRef<number>();
  const curLiveIdx = useRef<number>();

  const updateLive = (live: TileLiveContent) => {
    setLastLive(lastLive);
    setCurLive(live);
  };

  useEffect(() => {
    clearInterval(interval.current);

    if (lives.length === 0) {
      return;
    }

    if (lives.length === 1) {
      updateLive(lives[0]);
      return;
    }

    curLiveIdx.current = -1;
    interval.current = setInterval(() => {
      curLiveIdx.current = (curLiveIdx.current! + 1) % lives.length;
      updateLive(lives[curLiveIdx.current]);
    }, 5000);
  }, [lives]);

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
          >
            {size !== "middle" && WideTileTitle(myapp)}
            {size === "middle" && MiddleTileTitle(myapp)}
            {lastLive && LiveTile(myapp, lastLive, props)}
            {curLive && LiveTile(myapp, curLive, props)}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default DesktopTile;
