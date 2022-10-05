import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import { useMemo, useState } from "react";
import "./index.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props extends TileBasicProps {
  tz: string;
}

const Calendar: React.FC<Props> = (props) => {
  const [dd, setDd] = useState("");

  const parseMmdd = () => {
    const dj = dayjs().tz(props.tz);
    setDd(`${dj.date()}`);
  };

  const tileProps: DesktopTileProps = useMemo(() => {
    return {
      ...props,
      lives: [
        {
          id: "Calendar_tile",
          elem: (
            <div className="Calendar">
              <div className="day">{dd}</div>
            </div>
          ),
        },
      ],
      liveInt: 200000,
      delay: 2000,
    };
  }, [dd]);

  setTimeout(() => {
    parseMmdd();
  }, 2000);

  return <DesktopTile {...tileProps} />;
};

export default Calendar;
