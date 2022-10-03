import classNames from "classnames";
import { AppContext } from "../../context";
import "./index.scss";

interface Props {
  appid: string;
  size: "middle" | "wide";
  color?: string;
  children?: JSX.Element;
}

const DesktopTile: React.FC<Props> = (props: Props) => {
  const { appid, color = "w3-win8-cyan", size } = props;

  return (
    <AppContext.Consumer>
      {(context) => {
        const { apps, openApp } = context || {};
        const myapp = apps[appid];

        const handleClick = () => {
          openApp?.(appid);
        };

        return (
          <div
            className={classNames("DesktopTile", size, color)}
            onClick={handleClick}
          >
            <div className="DesktopTileContent">
              <img
                className="DesktopTileIcon"
                src={myapp.icon}
                alt={myapp.id}
              />
              <div className="DesktopTileName">{appid}</div>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default DesktopTile;
