import AppContainer, { AppContainerProps } from "../../AppContainer";
import "./index.scss";

const AppSettings: React.FC<AppContainerProps> = (props) => {
  return (
    <AppContainer {...props}>
      <div className="AppSettings">
        <h1>System</h1>
        <div>As you can see, there is nothing you can config, for now. </div>

        <h1>Repository</h1>
        <div>
          <span>This page: </span>
          <a href="https://github.com/tomoya06/myroom">
            github.com/tomoya06/myroom
          </a>
        </div>

        <h1>Credits</h1>
        <div>
          <a href="https://icons8.com/icons/">icons8</a>
        </div>
        <div>
          <a href="https://animista.net/play/basic">animista</a>
        </div>
        <div>
          <a href="https://cubic-bezier.com/">cubic-bezier generator</a>
        </div>
        <div>
          <a href="https://www.w3schools.com/colors/colors_win8.asp">
            w3schools win8 colors
          </a>
        </div>

        <h4>Big love for Windows 8</h4>
        <h5>©tomoya06 2022</h5>
      </div>
    </AppContainer>
  );
};

export default AppSettings;
