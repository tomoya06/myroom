import { AppApp, AppContextType, DesktopApp } from "./interface";
import { makeAutoObservable } from "mobx";

export class GlobalContext implements AppContextType {
  apps: Record<string, AppApp> = {};
  activeApp: string | undefined;
  openedApps: string[] = [];
  desktop: DesktopApp[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  closeApp = (app: string) => {
    this.openedApps = this.openedApps.filter((oa) => oa !== app);
  };
  openApp = (app: string) => {
    if (!this.openedApps.includes(app)) {
      this.openedApps.push(app);
    }
    this.activeApp = app;
  };
  toggleActive = (app: string) => {
    if (this.activeApp === app) {
      this.activeApp = undefined;
    } else {
      this.activeApp = app;
    }
  };
  closeAllApps = () => {
    this.openedApps = [];
    this.activeApp = undefined;
  };
}

export const globalContext = new GlobalContext();
