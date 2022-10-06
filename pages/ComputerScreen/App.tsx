import React, { useEffect, useMemo, useState } from "react";
import { installedAppToMap } from "./apps/installed";
import Desktop from "./components/Desktop";
import { observer } from "mobx-react-lite";
import { GlobalContext } from "./context";
import { inIframe, MessageName } from "../../src/utils/window";
import { SystemPreload } from "./apps/preload";
import LockScreen from "./components/LockScreen";

const App = observer<{ context: GlobalContext }>(({ context }) => {
  const [bootOn, setBootOn] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const { openedApps, activeApp } = context;

  const desktopIntance = useMemo(() => {
    return <Desktop />;
  }, []);

  const doPreload = async () => {
    await SystemPreload();
    setPreloaded(true);
  };

  useEffect(() => {
    doPreload();

    if (!inIframe()) {
      setBootOn(true);
      return;
    }

    window.addEventListener("message", (evt) => {
      if (evt.data === MessageName.PowerON) {
        setBootOn(true);
      }
      if (evt.data === MessageName.PowerOFF) {
        setBootOn(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {<LockScreen loading={true} unlocked={bootOn && preloaded} />}
      {bootOn && preloaded && (
        <>
          {openedApps.map((openedApp) => {
            const Elem = installedAppToMap[openedApp].content;
            if (!Elem) {
              return <></>;
            }

            return React.cloneElement(Elem, {
              key: openedApp,
              isActive: openedApp === activeApp,
            });
          })}
          {desktopIntance}
        </>
      )}
    </div>
  );
});

export default App;
