import { Fragment, useState } from "react";
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

  const closeAllApps = () => {
    setOpenedApps([]);
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
    closeAllApps,
  };

  return (
    <AppContext.Provider value={curContext}>
      <div className="App">
        {openedApps.map((openedApp) => {
          const Elem = installedAppToMap[openedApp].content;

          return <Fragment key={openedApp}>{Elem}</Fragment>;
        })}
        <Desktop />
        <Dock />
      </div>
    </AppContext.Provider>
  );
}

export default App;
