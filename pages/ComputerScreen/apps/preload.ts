import { preloadManager } from "../../../src/utils/image";
import {
  AdminAvatar,
  DesktopWallpaper,
  installedApps,
  TaskCenterActions,
  TaskCenterDockerIcons,
} from "./installed";

export const SystemPreload = async () => {
  const allUrl: string[] = [];

  allUrl.push(AdminAvatar);
  allUrl.push(DesktopWallpaper);
  allUrl.push(...TaskCenterActions.map((a) => a.icon));
  allUrl.push(...TaskCenterDockerIcons);

  allUrl.push(...installedApps.map((a) => a.icon));

  await preloadManager(allUrl);
};
