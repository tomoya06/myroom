import classNames from "classnames";
import { useState } from "react";
import { AdminAvatar, TaskCenterActions } from "../../apps/installed";
import "./index.scss";

const TaskCenter: React.FC = () => {
  const [showTc, setShowTc] = useState<boolean>();

  const handleAction = (action: string) => {
    if (action === "Home") {
      setShowTc(false);

      return;
    }
    if (action === "Exit") {
      setShowTc(false);
      postMessage("ComputerScreen_Exit");

      return;
    }
  };

  return (
    <div className="TaskCenter">
      <div className="DesktopAvatar" onClick={() => setShowTc(true)}>
        <div className="DesktopAvatarNames">
          <div className="FirstName">Administrator</div>
          <div className="LastName">tomoya06</div>
        </div>
        <img className="DesktopAvatarImg" src={AdminAvatar} alt="" />
      </div>
      {typeof showTc === "boolean" && (
        <div className={classNames("TaskCenterPanel", showTc ? "in" : "out")}>
          <div className="SystemControlPanel">
            {TaskCenterActions.map((action) => {
              return (
                <div
                  key={action.id}
                  className="SystemControlAction"
                  onClick={() => handleAction(action.id)}
                >
                  <img src={action.icon} alt={action.id} />
                </div>
              );
            })}
          </div>
          <div className="SystemInfoDocker"></div>
        </div>
      )}
    </div>
  );
};

export default TaskCenter;
