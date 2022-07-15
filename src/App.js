import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import ProvidersContext from "./contexts/ProvidersContext";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import "./App.less";
import "./less/flex.less";
import SettingsContext from "./contexts/SettingsContext";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = ({ storedProviders, storedOptions }) => {
  /** State */
  const [providers, setProviders] = useState(storedProviders);
  const [settings, setSettings] = useState(storedOptions);

  useEffect(() => {
    console.log("App received new providers via useEffect!");
    chrome.storage.sync.set(
      { providers: providers.filter((p) => p.visibility !== "delete") },
      () => {
        console.log("Providers stored in chrome");
        console.log(providers);
      }
    );
  }, [providers]);

  useEffect(() => {
    console.log("App received new options via useEffect!");
    chrome.storage.sync.set({ options: settings }, () => {
      console.log("Options stored in chrome");
      console.log(settings);
    });
  }, [settings]);

  /** Define tabs */
  const tabNames = { icons: "Icon Order", controls: "Settings" };
  const [selectedTab, setSelectedTab] = useState(tabNames.controls);
  const tabSelectHandler = (tabName) => setSelectedTab(tabName);

  return (
    <div className={"flex-container height-app width-app column"}>
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
