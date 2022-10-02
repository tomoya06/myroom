import React from "react";
import IframeApp from "./components/IframeApp";
import { AppApp, AppContextType, AppInfo, DesktopApp } from "./interface";

export const installedApps: AppApp[] = (() => {
  const output: AppApp[] = [];

  const aiGithub: AppInfo = {
    id: "GitHub",
    icon: "https://img.icons8.com/plasticine/100/000000/github-squared.png",
  };
  const appGithub: AppApp = {
    ...aiGithub,
    content: <IframeApp url="https://github.com/tomoya06" appInfo={aiGithub} />,
  };
  output.push(appGithub);

  const aiTime: AppInfo = {
    id: "北京时间",
    icon: "https://img.icons8.com/dusk/64/000000/watches-front-view--v2.png",
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

export const desktopApps: DesktopApp[] = [
  {
    id: "GitHub",
    pos: [1, 1],
  },
  {
    id: "北京时间",
    pos: [1, 2],
  },
];

export const AppContext = React.createContext<AppContextType>(
  undefined as never
);
