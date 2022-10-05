import AppContainer, { AppContainerProps } from "../AppContainer";
import "./index.scss";

interface Props extends AppContainerProps {
  url: string;
}

const AppOutside: React.FC<Props> = (props) => {
  const { url } = props;
  const openUrl = () => {
    window.open(url, "_blank");
  };

  return (
    <AppContainer {...props}>
      <div className="AppOutside">
        <div className="AppOutsideTitle">
          This App Must be Opened in Sperated Tab
        </div>
        <div className="AppOutsideHint">
          Due to security reason, you need to open this app in seperated tab.
          Feel free to click the bottom below if you're ready.{" "}
        </div>
        <div className="AppOutsideAction">
          <div className="button" onClick={openUrl}>
            GO
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default AppOutside;
