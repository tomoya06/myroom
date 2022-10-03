import React from "react";
import { AppContext } from "../../context";
import "./index.scss";

const Desktop: React.FC = () => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const { desktop = [] } = context || {};

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
                      const { id, content } = desktopApp;

                      return React.cloneElement(content, { key: id });
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Desktop;
