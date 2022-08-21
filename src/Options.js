import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import useSetStorageEffect from "./hooks/useSetStorageEffect";
import ProvidersContext from "./contexts/ProvidersContext";
import SettingsContext from "./contexts/SettingsContext";
import TabContainer from "./components/Tabs/TabContainer";
import OptionsContainer from "./pages/OptionsPage/OptionsContainer";
import OcsHeader from "./pages/OptionsPage/OcsHeader";
import Card from "./components/Cards/Card";
import tabs from "./data/tabs";
import { ToastsProvider } from "./reducers/ToastsReducer";
import ToastsContainer from "./components/Modals/ToastsContainer";

import "./App.less";
import "./Options.less";
import "./less/flex.less";
/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

/** Define App */
const Options = ({ storedProviders, storedOptions }) => {
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
  const defaultTab = tabs.appearance;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ProvidersContext.Provider value={{ providers, setProviders }}>
        <ToastsProvider>
          <div className={"options flex-container column"}>
            <ToastsContainer />
            <OcsHeader />
            <div className="main-content flex-container row">
              <div className="tabs-column">
                <h1>Options</h1>
                <Card>
                  <TabContainer
                    tabs={tabs}
                    selectedTab={selectedTab}
                    onTabSelect={setSelectedTab}
                  />
                </Card>
              </div>
              <div className="main-column">
                <OptionsContainer selectedTab={selectedTab} tabs={tabs} />
              </div>
            </div>
          </div>
        </ToastsProvider>
      </ProvidersContext.Provider>
    </SettingsContext.Provider>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<Options storedProviders={providers} storedOptions={options} />);
});
