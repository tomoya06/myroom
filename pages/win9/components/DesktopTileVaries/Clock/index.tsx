import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useMemo, useRef, useState } from "react";
import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import "./index.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  tz: string;
}

const ClockCounting: React.FC<Props> = (props) => {
  const [hhmmss, setHhmmss] = useState<string[]>();
  const itv = useRef<number>();

  const parseHhmmss = () => {
    const dj = dayjs().tz(props.tz);
    setHhmmss([
      `${dj.hour()}`.padStart(2, "0"),
      `${dj.minute()}`.padStart(2, "0"),
      `${dj.second()}`.padStart(2, "0"),
    ]);
  };

  useEffect(() => {
    itv.current = setInterval(() => {
      parseHhmmss();
    }, 1000);

    parseHhmmss();

    return () => {
      clearInterval(itv.current);
    };
  }, []);

  if (!hhmmss) {
    return <></>;
  }

  return (
    <div className="ClockCounting">
      <span className="hour">{hhmmss[0]}:</span>
      <span className="minute">{hhmmss[1]}</span>
      <span className="second">:{hhmmss[2]}</span>
    </div>
  );
};

interface ClockProps extends TileBasicProps {
  tz: string;
}

const Clock: React.FC<ClockProps> = (props) => {
  const elem = useMemo(() => {
    return <ClockCounting tz={props.tz} />;
  }, [props.tz]);

  const tileProps: DesktopTileProps = {
    ...props,
    lives: [
      {
        id: "ClockCounting",
        elem,
      },
    ],
    liveInt: 20000,
    delay: 3000,
  };

  return <DesktopTile {...tileProps} />;
};

export default Clock;
