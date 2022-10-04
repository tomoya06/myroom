import {
  aiGallery,
  aiGithub,
  aiLiveTest,
  aiNotWeather,
  aiTime,
  aiTime2,
} from "./apps/installed";
import DesktopTile from "./components/DesktopTile";
import { TileLiveContent } from "./components/DesktopTile/interface";
import Gallery from "./components/DesktopTileVaries/Gallery";
import NotWeatherTile from "./components/DesktopTileVaries/NotWeather";
import { DesktopApp } from "./interface";

const testLiveTiles: TileLiveContent[] = [
  {
    id: "livetile_1",
    title: "LiveTile Test",
  },
  {
    id: "livetile_2",
    title: "LiveTile Test 2",
    content: "This is the content for LiveTile Test 2",
  },
  {
    id: "livetile_3",
    title: "LiveTile Test 3",
    content:
      "This is the content for LiveTile Test 3 and this is a veeeeerrry long text. ",
    bg: "https://avatars.githubusercontent.com/u/35499042?v=4",
  },
  {
    id: "livetile_4",
    elem: (
      <div>
        <h1>HELLO WORLD</h1>
        <h2>THIS IS A CUSTOM ELEM</h2>
      </div>
    ),
    bg: "https://avatars.githubusercontent.com/u/35499042?v=4",
  },
];

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
      content: (
        <DesktopTile
          appInfo={aiLiveTest}
          size="wide"
          pos={[2, 0]}
          lives={testLiveTiles}
        />
      ),
    },
    {
      content: <Gallery appInfo={aiGallery} size="large" pos={[0, 2]} />,
    },
    {
      content: (
        <NotWeatherTile appInfo={aiNotWeather} size="large" pos={[2, 1]} />
      ),
    },
  ],
];
