import "./index.scss";
import AppContainer, { AppContainerProps } from "../../AppContainer";

interface Props extends AppContainerProps {
  url: string;
}

const IframeApp: React.FC<Props> = (props: Props) => {
  return (
    <AppContainer {...props}>
      <div className="iframeApp">
        <iframe src={props.url} frameBorder="0"></iframe>
      </div>
    </AppContainer>
  );
};

export default IframeApp;
