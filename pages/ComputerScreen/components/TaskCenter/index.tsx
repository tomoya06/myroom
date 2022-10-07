import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import {
  AdminAvatar,
  aiSettings,
  MDesktopAvatarMenu,
  TaskCenterActions,
  TaskCenterDockerIcons,
} from "../../apps/installed";
import "./index.scss";
import "./mobile.scss";
import dayjs from "dayjs";
import { globalContext } from "../../context";
import { MessageName, useMobile } from "../../../../src/utils/window";

const TaskCenter: React.FC = () => {
  const [showTc, setShowTc] = useState<boolean>();
  const [hhmm, setHHmm] = useState("");
  const [mmdd, setMMdd] = useState("");
  const [ddd, setDdd] = useState("");
  const timeout = useRef<number>();

  const isMobile = useMobile();
  const { openApp } = globalContext;

  const parseTime = () => {
    setHHmm(dayjs().format("HH:mm"));
    setMMdd(dayjs().format("MMM D"));
    setDdd(dayjs().format("dddd"));
  };

  useEffect(() => {
    timeout.current = setInterval(() => {
      parseTime();
    }, 1000);
    parseTime();

    return () => {
      clearInterval(timeout.current);
    };
  }, []);

  const handleAction = (action: string) => {
    if (action === "Home") {
    }
    if (action === "Exit") {
      window.parent.postMessage(MessageName.PowerOFF);
    }
    if (action === "Settings") {
      openApp(aiSettings.id);
    }

    setShowTc(false);
  };

  if (isMobile) {
    return (
      <div className="mTaskCenter">
        <div className="mDesktopAvatar" onClick={() => setShowTc(true)}>
          <div className="DesktopAvatarContent">
            <img className="mDesktopAvatarImg" src={AdminAvatar} alt="" />
            <div>Start</div>
          </div>
          <img className="mDesktopAvatarMenu" src={MDesktopAvatarMenu} alt="" />
        </div>

        {typeof showTc === "boolean" && (
          <div className={classNames("TaskCenterPanel", showTc ? "in" : "out")}>
            <div
              className="TaskCenterPanelMask"
              onClick={() => handleAction("Home")}
            ></div>
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
          </div>
        )}
      </div>
    );
  }

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
          <div
            className="TaskCenterPanelMask"
            onClick={() => handleAction("Home")}
          ></div>
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
          <div className="SystemInfoDocker">
            <div className="DockerIcons">
              {TaskCenterDockerIcons.map((icon) => (
                <img src={icon} key={icon} />
              ))}
            </div>
            <div className="DockerTime">{hhmm}</div>
            <div className="DockerDate">
              <div className="ddd">{ddd}</div>
              <div className="mmdd">{mmdd}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCenter;
