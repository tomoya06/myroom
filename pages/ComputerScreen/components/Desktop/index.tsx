import React, { useMemo } from "react";
import { desktopApps } from "../../apps/desktops";
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
          return (
            <div className="DesktopTilesGroup" key={`tilegroup_${idx}`}>
              {desktopGroup.map((desktopApp) => {
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
