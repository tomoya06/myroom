import React from "react";
import DesktopTile from "./components/DesktopTile";
import IframeApp from "./components/IframeApp";
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
  ],
];

export const AppContext = React.createContext<AppContextType>(
  undefined as never
);
