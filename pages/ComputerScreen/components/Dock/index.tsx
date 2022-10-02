import classNames from "classnames";
import { AppContextComp } from "../../interface";

interface Props extends AppContextComp {}

const Dock: React.FC<Props> = (props) => {
  const { apps = {}, openedApps = [], activeApp } = props.context || {};

  return (
    <div className="Dock">
      <div className="DockApp">OFF</div>
      <div className="DockApp">CLOSEALL</div>
      {openedApps.map((oa) => {
        const app = apps[oa];
        const isActive = activeApp === oa;
        return (
          <div
            className={classNames("DockApp", isActive && "active")}
            key={app.id}
          >
            {app.id}
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
