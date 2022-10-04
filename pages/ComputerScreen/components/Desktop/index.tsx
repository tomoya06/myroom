import React, { useMemo } from "react";
import { desktopApps } from "../../apps/desktops";
import { $tileSize } from "../../variables";
import "./index.scss";

interface Props {}

const Desktop: React.FC<Props> = () => {
  const desktop = useMemo(() => {
    return desktopApps;
  }, []);

  return (
    <div className="Desktop">
      <div className="DesktopHeader">
        <div className="DesktopStart">Start</div>
        <div className="DesktopAvatar">
          <div className="DesktopAvatarNames">
            <div className="FirstName">Administrator</div>
            <div className="LastName">tomoya06</div>
          </div>
          <img
            className="DesktopAvatarImg"
            src="https://avatars.githubusercontent.com/u/35499042?v=4"
            alt=""
          />
        </div>
      </div>

      <div className="DesktopTiles">
        {desktop.map((desktopGroup, idx) => {
          const { width, tiles } = desktopGroup;
          const style: React.CSSProperties = {
            width: `calc(${width} * ${$tileSize})`,
          };

          return (
            <div
              className="DesktopTilesGroup"
              style={style}
              key={`tilegroup_${idx}`}
            >
              {tiles.map((desktopApp) => {
                const { content } = desktopApp;

                return React.cloneElement(content, {
                  key: content.props.appInfo.id,
                });
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Desktop;
