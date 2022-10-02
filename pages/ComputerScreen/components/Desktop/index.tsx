import { AppContext } from "../../context";
import "./index.scss";

const Desktop: React.FC = () => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const { apps = {}, desktop = [], openApp } = context || {};
        const handleClickApp = (appId: string) => {
          openApp?.(appId);
        };

        return (
          <div className="Desktop">
            {desktop.map((desktopApp) => {
              const app = apps[desktopApp.id];

              return (
                <div
                  className="DesktopApp"
                  style={{
                    gridColumn: desktopApp.pos[0],
                    gridRow: desktopApp.pos[1],
                  }}
                  onDoubleClick={() => handleClickApp(desktopApp.id)}
                >
                  <img src={app.icon}></img>
                  <div>{app.id}</div>
                </div>
              );
            })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Desktop;
