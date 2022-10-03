import { AppProps } from "../../interface";
import clsn from "classnames";
import "./index.scss";
import { AppContext } from "../../context";

export interface AppContainerProps extends AppProps {
  children?: JSX.Element;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const { appInfo, children } = props;
        const { activeApp, toggleActive, closeApp } = context || {};
        const isActive = appInfo.id === activeApp;

        const handleMini = () => {
          toggleActive(appInfo.id);
        };
        const handleClose = () => {
          closeApp(appInfo.id);
        };

        return (
          <div
            className={clsn(
              "AppContainer",
              isActive ? "slide-in-right" : "slide-out-right"
            )}
          >
            <div className="AppContainerNavBar">
              <img src={appInfo.icon} alt={appInfo.id} />
              <div className="appTitle">{appInfo.id}</div>

              <div className="AppContainerActionbar">
                <div
                  className="AppContainerActionBtn actionbarClose"
                  onClick={handleMini}
                ></div>
              </div>
            </div>
            {children}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default AppContainer;
