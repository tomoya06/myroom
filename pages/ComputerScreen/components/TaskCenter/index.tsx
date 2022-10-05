import "./index.scss";

const TaskCenter: React.FC = () => {
  return (
    <div className="TaskCenter">
      <div className="DesktopAvatar">
        <div className="DesktopAvatarNames">
          <div className="FirstName">Administrator</div>
          <div className="LastName">tomoya06</div>
        </div>
        <img
          className="DesktopAvatarImg"
          src="https://avatars.githubusercontent.com/u/35499042?v=4"
          alt=""
        />
      </div>
    </div>
  );
};

export default TaskCenter;
