import React, { useMemo } from "react";
import { installedAppToMap } from "./apps/installed";
import Desktop from "./components/Desktop";
import { observer } from "mobx-react-lite";
import { GlobalContext } from "./context";

const App = observer<{ context: GlobalContext }>(({ context }) => {
  const { openedApps, activeApp } = context;

  const desktopIntance = useMemo(() => {
    return <Desktop />;
  }, []);

  return (
    <div className="App">
      {openedApps.map((openedApp) => {
        const Elem = installedAppToMap[openedApp].content;

        return React.cloneElement(Elem, {
          key: openedApp,
          isActive: openedApp === activeApp,
        });
      })}
      {desktopIntance}
    </div>
  );
});

export default App;
