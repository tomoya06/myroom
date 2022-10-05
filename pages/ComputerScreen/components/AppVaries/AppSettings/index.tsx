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
          <a href="https://github.com/tomoya06/myroom">
            github.com/tomoya06/myroom
          </a>
        </div>

        <h1>Credits to</h1>
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
        <h3>that made this project possible. </h3>

        <h1>Also thanks to</h1>
        <div>
          <a href="https://animista.net/play/basic">QWeather</a>
        </div>
        <div>
          <a href="https://time.is/">time.is</a>
        </div>
        <h3>
          that provided more reality to this project, although they may never
          know that.
        </h3>

        <h1>Big love for Windows 8. Good job Microsoft</h1>
        <h5>©tomoya06 2022</h5>
      </div>
    </AppContainer>
  );
};

export default AppSettings;
