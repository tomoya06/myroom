import {
  ai3jsGame,
  aiEasonBot,
  aiAppStore,
  aiGithub,
  aiLiveTest,
  aiNotWeder,
  aiTime,
  aiCalendar,
  aiTrashbin,
  aiXiaoXiaoLe,
  aiThisRepo,
  aiEngineerRepo,
  aiDoubanEventRepo,
} from "./installed";
import DesktopTile from "../components/DesktopTile";
import AppStore from "../components/DesktopTileVaries/AppStore";
import LiveTile from "../components/DesktopTileVaries/LiveTile";
import NotWeatherTile from "../components/DesktopTileVaries/NotWeather";
import { DesktopApp } from "../interface";
import Clock from "../components/DesktopTileVaries/Clock";
import Calendar from "../components/DesktopTileVaries/Calendar";

export const desktopApps: {
  width: number;
  tiles: DesktopApp[];
}[] = [
  {
    width: 4,
    tiles: [
      {
        content: <DesktopTile appInfo={aiGithub} size="wide" pos={[0, 0]} />,
      },
      {
        content: (
          <Clock
            appInfo={aiTime}
            size="middle"
            pos={[0, 1]}
            tz="Asia/Shanghai"
          />
        ),
      },
      {
        content: (
          <Calendar
            appInfo={aiCalendar}
            size="middle"
            pos={[1, 1]}
            tz="Asia/Shanghai"
          />
        ),
      },
      {
        content: <LiveTile appInfo={aiLiveTest} size="wide" pos={[2, 0]} />,
      },
      {
        content: <DesktopTile appInfo={aiTrashbin} size="large" pos={[0, 2]} />,
      },
      {
        content: (
          <NotWeatherTile appInfo={aiNotWeder} size="large" pos={[2, 1]} />
        ),
      },
    ],
  },
  {
    width: 3,
    tiles: [
      {
        content: (
          <DesktopTile appInfo={aiXiaoXiaoLe} size="middle" pos={[0, 0]} />
        ),
      },
      {
        content: (
          <DesktopTile
            appInfo={aiEasonBot}
            size="wide"
            pos={[1, 0]}
          ></DesktopTile>
        ),
      },
      {
        content: <AppStore appInfo={aiAppStore} size="large" pos={[0, 1]} />,
      },
      {
        content: <DesktopTile appInfo={ai3jsGame} size="middle" pos={[2, 1]} />,
      },
    ],
  },
  {
    width: 3,
    tiles: [
      {
        content: (
          <DesktopTile
            appInfo={aiThisRepo}
            size="wide"
            pos={[0, 0]}
            titleSize="middle"
          />
        ),
      },
      {
        content: (
          <DesktopTile appInfo={aiEngineerRepo} size="middle" pos={[2, 0]} />
        ),
      },
      {
        content: (
          <DesktopTile appInfo={aiDoubanEventRepo} size="middle" pos={[0, 1]} />
        ),
      },
    ],
  },
];
