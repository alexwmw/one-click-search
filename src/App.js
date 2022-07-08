import { createRoot } from "react-dom/client";
import React, { useState, lazy, useEffect } from "react";
import ProvidersContext from "./contexts/ProvidersContext";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import "./App.less";
import "./less/flex.less";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = ({ storedProviders, storedOptions }) => {
  /** State */
  const [providers, setProviders] = useState(storedProviders);

  /** Store and set providers in sequence */
  const storeProviders = (newProviders) => {
    chrome.storage.sync.set({ providers: newProviders }, () => {
      setProviders(newProviders);
    });
  };

  /** Define tabs */
  const tabNames = { icons: "Icon Order", controls: "Settings" };
  const [selectedTab, setSelectedTab] = useState(tabNames.icons);
  const tabSelectHandler = (tabName) => setSelectedTab(tabName);

  return (
    <div className={"flex-container height-app width-app column"}>
      <TabContainer
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <ProvidersContext.Provider value={{ providers, storeProviders }}>
        <PageContainer tabNames={tabNames} selectedTab={selectedTab} />
      </ProvidersContext.Provider>
    </div>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<App storedProviders={providers} storedOptions={options} />);
});
