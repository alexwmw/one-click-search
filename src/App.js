import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import ProvidersContext from "./contexts/ProvidersContext";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import "./App.less";
import "./less/flex.less";
import SettingsContext from "./contexts/SettingsContext";
import useSetStorageEffect from "./hooks/useSetStorageEffect";

import {
  faListDots as iconsIcon,
  faSliders as controlsIcon,
  faPalette as colorIcon,
} from "@fortawesome/free-solid-svg-icons";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const tabs = {
  icons: { name: "Icon Order", icon: iconsIcon },
  controls: { name: "Settings", icon: controlsIcon },
  color: { name: "color demo", icon: colorIcon },
};

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

  /** Define tabs */
  const defaultTab = tabs.icons;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <div className={"app flex-container height-app width-app row"}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <TabContainer
          tabs={tabs}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
        <ProvidersContext.Provider value={{ providers, setProviders }}>
          <PageContainer tabNames={tabs} selectedTab={selectedTab} />
        </ProvidersContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<App storedProviders={providers} storedOptions={options} />);
});
