import React from "react";
import DesktopTile from "./components/DesktopTile";
import IframeApp from "./components/AppIframe";
import { AppApp, AppContextType, AppInfo, DesktopApp } from "./interface";

export const installedApps: AppApp[] = (() => {
  const output: AppApp[] = [];

  const aiGithub: AppInfo = {
    id: "GitHub",
    icon: "https://img.icons8.com/material/100/FFFFFF/github-2.png",
  };
  const appGithub: AppApp = {
    ...aiGithub,
    content: <IframeApp url="https://github.com/tomoya06" appInfo={aiGithub} />,
  };
  output.push(appGithub);

  const aiTime: AppInfo = {
    id: "北京时间",
    icon: "https://img.icons8.com/material/100/FFFFFF/around-the-globe.png",
  };
  const appTime: AppApp = {
    ...aiTime,
    content: <IframeApp url="https://time.is/zh/Beijing" appInfo={aiTime} />,
  };
  output.push(appTime);

  const aiLiveTest: AppInfo = {
    id: "LiveTile",
    icon: "https://img.icons8.com/ios-filled/100/FFFFFF/movie-theater.png",
  };
  const appLiveTest: AppApp = {
    ...aiLiveTest,
    content: <></>,
  };
  output.push(appLiveTest);

  return output;
})();

export const installedAppToMap: Record<string, AppApp> = (() => {
  return Object.fromEntries(installedApps.map((app) => [app.id, app]));
})();

export const desktopApps: DesktopApp[][] = [
  [
    {
      id: "GitHub",
      content: <DesktopTile appid="GitHub" size="wide" />,
    },
    {
      id: "北京时间",
      content: <DesktopTile appid="北京时间" size="middle" />,
    },
    {
      id: "LiveTile",
      content: (
        <DesktopTile
          appid="LiveTile"
          size="large"
          lives={[
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
          ]}
        />
      ),
    },
  ],
];

export const AppContext = React.createContext<AppContextType>(
  undefined as never
);
