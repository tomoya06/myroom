import classNames from "classnames";
import DotsLoading from "../../partials/DotsLoading";
import TextLoop from "../../partials/TextLoop";
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
          <div style={{ margin: `1rem 0 0 0` }}></div>
          {!unlocked && (
            <TextLoop
              int={5000}
              texts={[
                "Installing system apps...",
                "Clearing cache...",
                "Optimizing system apps...",
                "Optimizing system...",
                "Running graphic test...",
                "Updating graphic settings...",
                "Optimizing graphic quality...",
              ]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LockScreen;
