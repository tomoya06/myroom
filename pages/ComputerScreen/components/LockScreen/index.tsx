import classNames from "classnames";
import DotsLoading from "../../partials/DotsLoading";
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
        <>
          <DotsLoading />
        </>
      )}
    </div>
  );
};

export default LockScreen;
