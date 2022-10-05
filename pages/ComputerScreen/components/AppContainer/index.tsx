import { AppProps } from "../../interface";
import clsn from "classnames";
import "./index.scss";
import { globalContext } from "../../context";

export interface AppContainerProps extends AppProps {
  children?: JSX.Element;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { appInfo, children, isActive } = props;

  const { toggleActive, closeApp } = globalContext;

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
      <div className="AppContainerContent">{children}</div>
    </div>
  );
};

export default AppContainer;
