import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import ProvidersContext from "./contexts/ProvidersContext";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import "./App.less";
import "./less/flex.less";
import SettingsContext from "./contexts/SettingsContext";
import useSetStorageEffect from "./hooks/useSetStorageEffect";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const tabNames = {
  icons: "Icon Order",
  controls: "Settings",
  color: "color demo",
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
  const defaultTab = tabNames.icons;
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const tabSelectHandler = (tabName) => setSelectedTab(tabName);

  return (
    <div className={"app flex-container height-app width-app column"}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <TabContainer
          tabNames={tabNames}
          selectedTab={selectedTab}
          onTabSelect={tabSelectHandler}
        />
        <ProvidersContext.Provider value={{ providers, setProviders }}>
          <PageContainer tabNames={tabNames} selectedTab={selectedTab} />
        </ProvidersContext.Provider>
      </SettingsContext.Provider>
    </div>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<App storedProviders={providers} storedOptions={options} />);
});
