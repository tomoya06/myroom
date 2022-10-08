import IframeApp from "../components/AppVaries/AppIframe";
import AppOutside from "../components/AppVaries/AppOutside";
import AppSettings from "../components/AppVaries/AppSettings";
import { AppApp, AppInfo, TaskCenterActionInfo } from "../interface";
import iconApstore from "@pages/ComputerScreen/assets/app-store-ios.png";
import iconTime from "@pages/ComputerScreen/assets/around-the-globe.png";
import iconCalendar from "@pages/ComputerScreen/assets/calendar-1.png";
import iconTrasnBlog from "@pages/ComputerScreen/assets/external-creative-writing-ui-ux-user-interface-smashingstocks-detailed-outline-smashing-stocks.png";
import iconEngineer from "@pages/ComputerScreen/assets/external-engineer-female-profession-vitaliy-gorbachev-fill-vitaly-gorbachev.png";
import iconGameFlight from "@pages/ComputerScreen/assets/external-flight-ui-ux-user-interface-smashingstocks-detailed-outline-smashing-stocks.png";
import iconGameGoal from "@pages/ComputerScreen/assets/external-Goal-football-glyph-glyph-andi-nur-abdillah.png";
import iconGameEasonbot from "@pages/ComputerScreen/assets/external-sing-birthday-party-tulpahn-basic-outline-tulpahn.png";
import iconGithub from "@pages/ComputerScreen/assets/github-2.png";
import iconLivetile from "@pages/ComputerScreen/assets/movie-theater.png";
import iconNotWeder from "@pages/ComputerScreen/assets/partly-cloudy-day--v1.png";
import iconThisRepo from "@pages/ComputerScreen/assets/registry-editor.png";
import iconDouban from "@pages/ComputerScreen/assets/repository.png";
import iconSettings from "@pages/ComputerScreen/assets/settings.png";
import iconShutdown from "@pages/ComputerScreen/assets/shutdown.png";
import iconWindows from "@pages/ComputerScreen/assets/windows-10.png";
import iBattery from "@pages/ComputerScreen/assets/high-battery.png";
import iMenu from "@pages/ComputerScreen/assets/menu.png";
import iWifi from "@pages/ComputerScreen/assets/wifi.png";

export const AdminAvatar =
  "https://avatars.githubusercontent.com/u/35499042?v=4";
export const DesktopWallpaper =
  "https://s2.loli.net/2022/10/06/q9bTulcUsD2eKoz.jpg";

export const MDesktopAvatarMenu = iMenu;

export const TaskCenterActions: TaskCenterActionInfo[] = [
  {
    id: "Exit",
    icon: iconShutdown,
  },
  {
    id: "Home",
    icon: iconWindows,
  },
  {
    id: "Settings",
    icon: iconSettings,
  },
];

export const TaskCenterDockerIcons = [iWifi, iBattery];

export const aiGithub: AppInfo = {
  id: "GitHub",
  icon: iconGithub,
  color: "w3-win8-steel",
};

export const aiTime: AppInfo = {
  id: "北京时间",
  icon: iconTime,
};

export const aiCalendar: AppInfo = {
  id: "日历",
  icon: iconCalendar,
};
export const aiLiveTest: AppInfo = {
  id: "LiveTile",
  icon: iconLivetile,
};

export const aiAppStore: AppInfo = {
  id: "Ap'Store",
  icon: iconApstore,
  color: "w3-win8-magenta",
};
export const aiNotWeder: AppInfo = {
  id: "NotWeder",
  icon: iconNotWeder,
  color: "w3-win8-cobalt",
};

export const aiXiaoXiaoLe: AppInfo = {
  id: "Game - GoGoal",
  icon: iconGameGoal,
  color: "w3-win8-emerald",
};

export const aiEasonBot: AppInfo = {
  id: "EasonBot",
  icon: iconGameEasonbot,
  color: "w3-win8-orange",
};

export const aiTrashbin: AppInfo = {
  id: "TrashBlog",
  icon: iconTrasnBlog,
  color: "w3-win8-olive",
};

export const ai3jsGame: AppInfo = {
  id: "Game - FlyCruise",
  icon: iconGameFlight,
  color: "w3-win8-emerald",
};

export const aiSettings: AppInfo = {
  id: "Settings",
  icon: iconSettings,
  color: "w3-win8-steel",
};

export const aiThisRepo: AppInfo = {
  id: "System Insight",
  icon: iconThisRepo,
  color: "w3-win8-brown",
};

export const aiEngineerRepo: AppInfo = {
  id: "Develop Guidance",
  icon: iconEngineer,
  color: "w3-win8-brown",
};

export const aiDoubanEventRepo: AppInfo = {
  id: "RN豆瓣同城 REPO",
  icon: iconDouban,
  color: "w3-win8-emerald",
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
    content: null,
  };
  output.push(appCalendar);

  const appLiveTest: AppApp = {
    ...aiLiveTest,
    content: null,
  };
  output.push(appLiveTest);

  const appAppStore: AppApp = {
    ...aiAppStore,
    content: null,
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

  const appThisRepo: AppApp = {
    ...aiThisRepo,
    content: (
      <AppOutside
        url="https://github.com/tomoya06/myroom"
        appInfo={aiThisRepo}
      />
    ),
  };
  output.push(appThisRepo);

  const appEngineerRepo: AppApp = {
    ...aiEngineerRepo,
    content: (
      <AppOutside
        hint="You should be aware that this is never a real guidance. It's just a notebook to keep some notes for myself, and it's no longer maintained. &#10;(at least not on GitHub any more)&#10;But still it's where all the dream began, so it is my pleasure to share it with you guys. "
        url="https://github.com/tomoya06/web-developer-guidance"
        appInfo={aiEngineerRepo}
      />
    ),
  };
  output.push(appEngineerRepo);

  const appDoubanEventRepo: AppApp = {
    ...aiDoubanEventRepo,
    content: (
      <AppOutside
        hint="This project is no longer maintained but it's my first mobile app project. Hope it helps."
        url="https://github.com/tomoya06/web-developer-guidance"
        appInfo={aiDoubanEventRepo}
      />
    ),
  };
  output.push(appDoubanEventRepo);

  return output;
})();

export const installedAppToMap: Record<string, AppApp> = (() => {
  return Object.fromEntries(installedApps.map((app) => [app.id, app]));
})();
