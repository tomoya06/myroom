import IframeApp from "../components/AppIframe";
import { AppApp, AppInfo } from "../interface";

export const aiGithub: AppInfo = {
  id: "GitHub",
  icon: "https://img.icons8.com/material/100/FFFFFF/github-2.png",
};

export const aiTime: AppInfo = {
  id: "北京时间",
  icon: "https://img.icons8.com/material/100/FFFFFF/around-the-globe.png",
};

export const aiTime2: AppInfo = {
  id: "纽约时间",
  icon: "https://img.icons8.com/material/100/FFFFFF/around-the-globe.png",
};
export const aiLiveTest: AppInfo = {
  id: "LiveTile",
  icon: "https://img.icons8.com/ios-filled/100/FFFFFF/movie-theater.png",
};

export const aiGallery: AppInfo = {
  id: "Gallery",
  icon: "https://img.icons8.com/material/100/FFFFFF/stack-of-photos--v1.png",
};
export const aiNotWeder: AppInfo = {
  id: "NotWeder",
  icon: "https://img.icons8.com/ios-filled/100/FFFFFF/partly-cloudy-day--v1.png",
};

export const installedApps: AppApp[] = (() => {
  const output: AppApp[] = [];

  const appGithub: AppApp = {
    ...aiGithub,
    content: <IframeApp url="https://github.com/tomoya06" appInfo={aiGithub} />,
  };

  const appTime: AppApp = {
    ...aiTime,
    content: <IframeApp url="https://time.is/zh/Beijing" appInfo={aiTime} />,
  };
  output.push(appGithub);

  output.push(appTime);

  const appTime2: AppApp = {
    ...aiTime2,
    content: <IframeApp url="https://time.is/zh/NewYork" appInfo={aiTime2} />,
  };
  output.push(appTime2);

  const appLiveTest: AppApp = {
    ...aiLiveTest,
    content: <></>,
  };
  output.push(appLiveTest);

  const appLiveTest2: AppApp = {
    ...aiGallery,
    content: <></>,
  };
  output.push(appLiveTest2);

  const appNotWeather: AppApp = {
    ...aiNotWeder,
    content: <IframeApp url="https://www.qweather.com" appInfo={aiNotWeder} />,
  };
  output.push(appNotWeather);

  return output;
})();

export const installedAppToMap: Record<string, AppApp> = (() => {
  return Object.fromEntries(installedApps.map((app) => [app.id, app]));
})();
