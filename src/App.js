import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import ProvidersContext from "/src/contexts/ProvidersContext";
import "./App.less";
import "/src/less/flex.less";
import SettingsContext from "/src/contexts/SettingsContext";
import useSetStorageEffect from "/src/hooks/useSetStorageEffect";
import ProvidersPage from "/src/pages/ProvidersPage/ProvidersPage";

import {
  faListDots as iconsIcon,
  faSliders as controlsIcon,
  faPalette as colorIcon,
} from "@fortawesome/free-solid-svg-icons";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = ({ storedProviders, storedOptions }) => {
  /** Context States */
  const [providers, setProviders] = useState(storedProviders);
  const [settings, setSettings] = useState(storedOptions);

  useSetStorageEffect(
    {
      providers: providers.filter((p) => !p.delete),
      options: settings,
    },
    ["log"]
  );

  return (
    <div className={"app flex-container height-app width-app row"}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <ProvidersContext.Provider value={{ providers, setProviders }}>
          <ProvidersPage />
        </ProvidersContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<App storedProviders={providers} storedOptions={options} />);
});
