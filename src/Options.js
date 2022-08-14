import { createRoot } from "react-dom/client";
import React, { useState } from "react";

import { faListDots as editIcon } from "@fortawesome/free-solid-svg-icons";

import useSetStorageEffect from "./hooks/useSetStorageEffect";
import ProvidersContext from "./contexts/ProvidersContext";
import SettingsContext from "./contexts/SettingsContext";

import TabContainer from "./components/Tabs/TabContainer";
import OptionsContainer from "./pages/OptionsPage/OptionsContainer";
import Card from "./components/Cards/Card";
import Button from "./components/Buttons/Button";
import tabs from "./data/tabs";

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
    <div className={"options flex-container column"}>
      <div className="header">
        <img src={"/icons/icon16.png"}></img>
        <h1>One Click Search</h1>
        <Button icon={editIcon}>Manage providers</Button>
      </div>
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
          <SettingsContext.Provider value={{ settings, setSettings }}>
            <ProvidersContext.Provider value={{ providers, setProviders }}>
              <OptionsContainer selectedTab={selectedTab} tabs={tabs} />
            </ProvidersContext.Provider>
          </SettingsContext.Provider>
        </div>
      </div>
    </div>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<Options storedProviders={providers} storedOptions={options} />);
});
