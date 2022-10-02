import { useState } from "react";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import { AppContext, installedAppToMap, desktopApps } from "./context";
import { AppContextType, DesktopApp } from "./interface";

function App() {
  const [activeApp, setActiveApp] = useState<string | undefined>(undefined);
  const [openedApps, setOpenedApps] = useState<string[]>([]);
  const [desktop, setDesktop] = useState<DesktopApp[]>(desktopApps);

  const closeApp = (app: string) => {
    const newOpenedApps = [...openedApps].filter((oa) => oa !== app);
    setOpenedApps(newOpenedApps);
  };

  const openApp = (app: string) => {
    const newOpenedApps = [...new Set([...openedApps, app])];
    setOpenedApps(newOpenedApps);
    setActiveApp(app);
  };

  const toggleActive = (app: string) => {
    if (activeApp === app) {
      setActiveApp(undefined);
    } else {
      setActiveApp(app);
    }
  };

  const curContext: AppContextType = {
    activeApp,
    apps: installedAppToMap,
    openedApps,
    desktop,
    toggleActive,
    closeApp,
    openApp,
  };

  return (
    <AppContext.Provider value={curContext}>
      <div className="App">
        {openedApps.map((openedApp) => installedAppToMap[openedApp].content)}
        <Desktop />
        <Dock />
      </div>
    </AppContext.Provider>
  );
}

export default App;
