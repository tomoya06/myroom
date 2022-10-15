import classNames from "classnames";
import AppContainer, { AppContainerProps } from "../../AppContainer";
import "./index.scss";

interface Props extends AppContainerProps {
  url?: string;
  hint?: string;
}

const AppOutside: React.FC<Props> = (props) => {
  const { url, hint, appInfo } = props;
  const openUrl = () => {
    window.open(url, "_blank");
  };

  const displayHint =
    hint ||
    "Due to security reason, you need to open this app in seperated tab. Feel free to click the bottom below if you're ready.";

  return (
    <AppContainer {...props}>
      <div
        className={classNames("AppOutside", "AppContent", appInfo.color || "")}
      >
        <div className="AppOutsideTitle">
          This App Must be Opened in Sperated Tab
        </div>
        <div className="AppOutsideHint">
          {displayHint}
          <br />
          <br />
          {url && `You will be led to ${url} .`}
        </div>
        {url && (
          <div className="AppOutsideAction">
            <div className="button" onClick={openUrl}>
              GO
            </div>
          </div>
        )}
      </div>
    </AppContainer>
  );
};

export default AppOutside;
