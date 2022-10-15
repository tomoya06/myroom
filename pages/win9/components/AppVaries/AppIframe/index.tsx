import "./index.scss";
import AppContainer, { AppContainerProps } from "../../AppContainer";
import { useState } from "react";

interface Props extends AppContainerProps {
  url: string;
}

const IframeApp: React.FC<Props> = (props: Props) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
  };

  return (
    <AppContainer {...props} loaded={loaded}>
      <div className="iframeApp AppContent">
        <iframe src={props.url} frameBorder="0" onLoad={handleLoaded}></iframe>
      </div>
    </AppContainer>
  );
};

export default IframeApp;
