import {
  aiGallery,
  aiGithub,
  aiLiveTest,
  aiNotWeder,
  aiTime,
  aiTime2,
  aiXiaoXiaoLe,
} from "./installed";
import DesktopTile from "../components/DesktopTile";
import Gallery from "../components/DesktopTileVaries/Gallery";
import LiveTile from "../components/DesktopTileVaries/LiveTile";
import NotWeatherTile from "../components/DesktopTileVaries/NotWeather";
import { DesktopApp } from "../interface";

export const desktopApps: DesktopApp[][] = [
  [
    {
      content: <DesktopTile appInfo={aiGithub} size="wide" pos={[0, 0]} />,
    },
    {
      content: <DesktopTile appInfo={aiTime} size="middle" pos={[0, 1]} />,
    },
    {
      content: <DesktopTile appInfo={aiTime2} size="middle" pos={[1, 1]} />,
    },
    {
      content: <LiveTile appInfo={aiLiveTest} size="wide" pos={[2, 0]} />,
    },
    {
      content: <Gallery appInfo={aiGallery} size="large" pos={[0, 2]} />,
    },
    {
      content: (
        <NotWeatherTile appInfo={aiNotWeder} size="large" pos={[2, 1]} />
      ),
    },
  ],
  [
    {
      content: (
        <DesktopTile appInfo={aiXiaoXiaoLe} size="middle" pos={[0, 0]} />
      ),
    },
  ],
];
