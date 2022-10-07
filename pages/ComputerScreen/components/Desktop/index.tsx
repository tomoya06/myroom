import React, { useMemo } from "react";
import { useMobile } from "../../../../src/utils/window";
import { desktopApps } from "../../apps/desktops";
import { $tileSize } from "../../variables";
import TaskCenter from "../TaskCenter";
import "./index.scss";
import "./mobile.scss";

interface Props {}

const Desktop: React.FC<Props> = () => {
  const desktop = useMemo(() => {
    return desktopApps;
  }, []);

  const isMobile = useMobile();

  return (
    <>
      {isMobile ? (
        <div className="MDesktop">
          <div className="MDesktopHeader"></div>
          <div className="MDesktopTiles">
            {desktop.map((desktopGroup) => {
              return (
                <>
                  {desktopGroup.tiles.map((desktopApp) => {
                    const { content } = desktopApp;
                    return React.cloneElement(content, {
                      key: content.props.appInfo.id,
                    });
                  })}
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="Desktop">
          <div className="DesktopHeader">
            <div className="DesktopStart">Start</div>
            <TaskCenter />
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
      )}
    </>
  );
};

export default Desktop;
