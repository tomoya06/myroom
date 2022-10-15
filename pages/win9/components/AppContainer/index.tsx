import { AppProps } from "../../interface";
import clsn from "classnames";
import "./index.scss";
import { globalContext } from "../../context";
import classNames from "classnames";
import { $defaultThemeColor } from "../../variables";
import DotsLoading from "../../partials/DotsLoading";
import { useState } from "react";

export interface AppContainerProps extends AppProps {
  children?: JSX.Element;
  loaded?: boolean;
  useColor?: boolean;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { appInfo, children, isActive, loaded, useColor } = props;
  const [isExiting, setExiting] = useState(false);

  const { toggleActive, closeApp } = globalContext;

  const handleMini = () => {
    toggleActive(appInfo.id);
  };
  const handleClose = () => {
    toggleActive(appInfo.id);
    setExiting(true);
    setTimeout(() => {
      closeApp(appInfo.id);
    }, 200);
  };

  return (
    <div
      className={clsn(
        "AppContainer",
        useColor && (appInfo.color || $defaultThemeColor),
        isActive ? "in" : isExiting ? "exit" : "out"
      )}
    >
      <div className="AppContainerNavBar">
        <img src={appInfo.icon} alt={appInfo.id} />
        <div className="appTitle">{appInfo.id}</div>

        <div className="AppContainerActionbar">
          <div
            className="AppContainerActionBtn actionbarMini"
            onClick={handleMini}
          ></div>
          <div
            className="AppContainerActionBtn actionbarClose"
            onClick={handleClose}
          ></div>
        </div>
      </div>
      <div
        className={classNames(
          "AppContaienerCover",
          appInfo.color || $defaultThemeColor,
          typeof loaded === "undefined" && "out now",
          loaded === true && "out"
        )}
      >
        <img className="AppContaienerCoverIcon" src={appInfo.icon} />
        <div className="AppContaienerCoverTitle">{appInfo.id}</div>
        <div className="AppContaienerCoverLoading">
          <DotsLoading />
        </div>
      </div>
      <div className="AppContainerContent">{children}</div>
    </div>
  );
};

export default AppContainer;
