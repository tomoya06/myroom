import IframeApp from "../components/AppVaries/AppIframe";
import AppOutside from "../components/AppVaries/AppOutside";
import AppSettings from "../components/AppVaries/AppSettings";
import { AppApp, AppInfo, TaskCenterActionInfo } from "../interface";

export const AdminAvatar =
  "https://avatars.githubusercontent.com/u/35499042?v=4";

export const TaskCenterActions: TaskCenterActionInfo[] = [
  {
    id: "Exit",
    icon: "https://img.icons8.com/metro/100/FFFFFF/shutdown.png",
  },
  {
    id: "Home",
    icon: "https://img.icons8.com/ios-filled/100/FFFFFF/windows-10.png",
  },
  {
    id: "Settings",
    icon: "https://img.icons8.com/metro/100/FFFFFF/settings.png",
  },
  // {
  //   id: "Recent",
  //   icon: "",
  //   action: EnumTaskCenterAction.Recent,
  // },
];

export const TaskCenterDockerIcons = [
  "https://img.icons8.com/metro/26/FFFFFF/wifi.png",
  "https://img.icons8.com/metro/26/FFFFFF/high-battery.png",
];

// FIXME: system preload procedure

export const aiGithub: AppInfo = {
  id: "GitHub",
  icon: "https://img.icons8.com/material/100/FFFFFF/github-2.png",
  color: "w3-win8-steel",
};

export const aiTime: AppInfo = {
  id: "北京时间",
  icon: "https://img.icons8.com/material/100/FFFFFF/around-the-globe.png",
};

export const aiCalendar: AppInfo = {
  id: "日历",
  icon: "https://img.icons8.com/metro/100/FFFFFF/calendar-1.png",
};
export const aiLiveTest: AppInfo = {
  id: "LiveTile",
  icon: "https://img.icons8.com/ios-filled/100/FFFFFF/movie-theater.png",
};

export const aiAppStore: AppInfo = {
  id: "ApStore",
  icon: "https://img.icons8.com/sf-ultralight-filled/100/FFFFFF/app-store-ios.png",
  color: "w3-win8-magenta",
};
export const aiNotWeder: AppInfo = {
  id: "NotWeder",
  icon: "https://img.icons8.com/ios-filled/100/FFFFFF/partly-cloudy-day--v1.png",
  color: "w3-win8-cobalt",
};

export const aiXiaoXiaoLe: AppInfo = {
  id: "Game - GoGoal",
  icon: "https://img.icons8.com/external-glyph-andi-nur-abdillah/100/FFFFFF/external-Goal-football-(glyph)-glyph-andi-nur-abdillah.png",
  color: "w3-win8-emerald",
};

export const aiEasonBot: AppInfo = {
  id: "EasonBot",
  icon: "https://img.icons8.com/external-tulpahn-basic-outline-tulpahn/100/FFFFFF/external-sing-birthday-party-tulpahn-basic-outline-tulpahn.png",
  color: "w3-win8-orange",
};

export const aiTrashbin: AppInfo = {
  id: "TrashBlog",
  icon: "https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/100/FFFFFF/external-creative-writing-ui-ux-user-interface-smashingstocks-detailed-outline-smashing-stocks.png",
  color: "w3-win8-olive",
};

export const ai3jsGame: AppInfo = {
  id: "Game - FlyCruise",
  icon: "https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/100/FFFFFF/external-flight-ui-ux-user-interface-smashingstocks-detailed-outline-smashing-stocks.png",
  color: "w3-win8-emerald",
};

export const aiSettings: AppInfo = {
  id: "Settings",
  icon: "https://img.icons8.com/metro/100/FFFFFF/settings.png",
  color: "w3-win8-steel",
};

export const installedApps: AppApp[] = (() => {
  const output: AppApp[] = [];

  const appGithub: AppApp = {
    ...aiGithub,
    content: (
      <AppOutside url="https://github.com/tomoya06" appInfo={aiGithub} />
    ),
  };

  const appTime: AppApp = {
    ...aiTime,
    content: <IframeApp url="https://time.is/zh/Beijing" appInfo={aiTime} />,
  };
  output.push(appGithub);

  output.push(appTime);

  const appCalendar: AppApp = {
    ...aiCalendar,
    content: <></>,
  };
  output.push(appCalendar);

  const appLiveTest: AppApp = {
    ...aiLiveTest,
    content: <></>,
  };
  output.push(appLiveTest);

  const appAppStore: AppApp = {
    ...aiAppStore,
    content: <></>,
  };
  output.push(appAppStore);

  const appNotWeather: AppApp = {
    ...aiNotWeder,
    content: <IframeApp url="https://www.qweather.com" appInfo={aiNotWeder} />,
  };
  output.push(appNotWeather);

  const appXiaoxiaole: AppApp = {
    ...aiXiaoXiaoLe,
    content: (
      <IframeApp
        url="https://tomoya06.github.io/superhappy-xiaoxiaole/"
        appInfo={aiXiaoXiaoLe}
      />
    ),
  };
  output.push(appXiaoxiaole);

  const appEasonBot: AppApp = {
    ...aiEasonBot,
    content: (
      <IframeApp
        url="https://tomoya06.github.io/easonbot/"
        appInfo={aiEasonBot}
      />
    ),
  };
  output.push(appEasonBot);

  const appTrashbin: AppApp = {
    ...aiTrashbin,
    content: (
      <IframeApp
        url="https://tomoya06.github.io/trashbin/"
        appInfo={aiTrashbin}
      />
    ),
  };
  output.push(appTrashbin);

  const app3jsGame: AppApp = {
    ...ai3jsGame,
    content: (
      <IframeApp
        url="https://tomoya06.github.io/3jsgame/"
        appInfo={ai3jsGame}
      />
    ),
  };
  output.push(app3jsGame);

  const appSettings: AppApp = {
    ...aiSettings,
    content: <AppSettings appInfo={aiSettings} />,
  };
  output.push(appSettings);

  return output;
})();

export const installedAppToMap: Record<string, AppApp> = (() => {
  return Object.fromEntries(installedApps.map((app) => [app.id, app]));
})();
