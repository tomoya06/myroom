export interface AppInfo {
  id: string;
  icon: string;
}

export interface AppApp extends AppInfo {
  content: JSX.Element;
}

export interface DesktopApp {
  id: string;
  pos: [number, number];
}

export interface AppContextType {
  activeApp: string | undefined;
  apps: Record<string, AppApp>;
  openedApps: string[];
  desktop: DesktopApp[];
  setActiveApp: (app: string | undefined) => void;
  closeApp: (app: string) => void;
  openApp: (app: string) => void;
}

export interface AppContextComp {
  context?: AppContextType;
}

export interface AppProps extends AppContextComp {
  appInfo: AppInfo;
}
