import classNames from "classnames";
import { AppContext } from "../../context";
import "./index.scss";

const Dock: React.FC = () => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const {
          apps = {},
          openedApps = [],
          activeApp,
          toggleActive,
          closeAllApps,
        } = context || {};

        const handleCloseAll = () => {
          closeAllApps();
        };

        return (
          <div className="Dock">
            <div className="DockApp System_Off"></div>
            <div
              className="DockApp System_CloseAll"
              onClick={handleCloseAll}
            ></div>
            {openedApps.map((oa) => {
              const app = apps[oa];
              const isActive = activeApp === oa;

              const handleClick = () => {
                toggleActive(oa);
              };

              return (
                <div
                  className={classNames("DockApp", isActive && "active")}
                  key={app.id}
                  style={{
                    backgroundImage: `url(${app.icon})`,
                  }}
                  onClick={handleClick}
                >
                  {isActive && <div className="DockAppActiveBar"></div>}
                </div>
              );
            })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Dock;
