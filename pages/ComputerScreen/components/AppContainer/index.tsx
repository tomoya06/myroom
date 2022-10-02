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
        const { activeApp } = context || {};
        const isActive = appInfo.id === activeApp;

        return (
          <div className={clsn("appContainer", isActive && "active")}>
            <div className="navbar">
              <img src={appInfo.icon} alt={appInfo.id} />
              <div className="appTitle">{appInfo.id}</div>

              <div className="actionbar">
                <div className="actionbtn actionbarMini"></div>
                <div className="actionbtn actionbarClose"></div>
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
