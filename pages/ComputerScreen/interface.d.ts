export interface AppInfo {
  id: string;
  icon: string;
}

export interface AppApp extends AppInfo {
  content: JSX.Element;
}

export interface DesktopApp {
  id: string;
  content: JSX.Element;
}

export interface AppContextType {
  activeApp: string | undefined;
  apps: Record<string, AppApp>;
  openedApps: string[];
  desktop: DesktopApp[][];
  closeApp: (app: string) => void;
  openApp: (app: string) => void;
  toggleActive: (app: string) => void;
  closeAllApps: () => void;
}

export interface AppProps {
  appInfo: AppInfo;
}
