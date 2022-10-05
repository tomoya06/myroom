import classNames from "classnames";
import "./index.scss";

interface Props {
  loading: boolean;
  unlocked: boolean;
}

const LockScreen: React.FC<Props> = (props) => {
  const { loading, unlocked } = props;

  return (
    <div className={classNames("LockScreen", unlocked && "unlocked")}>
      {loading && (
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default LockScreen;
