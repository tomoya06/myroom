import { AppProps } from "../../interface";
import clsn from "classnames";

export interface AppContainerProps extends AppProps {
  children?: JSX.Element;
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const { appInfo, children, context } = props;
  const isActive = appInfo.id === context?.activeApp;

  return (
    <div className={clsn("appContainer", isActive && "active")}>{children}</div>
  );
};

export default AppContainer;
