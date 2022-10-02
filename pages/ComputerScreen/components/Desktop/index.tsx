import { AppContextComp } from "../../interface";

interface Props extends AppContextComp {}

const Desktop: React.FC<Props> = (props) => {
  const { apps = {}, desktop = [], openApp } = props.context || {};

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
            <div>{app.icon}</div>
            <div>{app.id}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Desktop;
