import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import ProvidersContext from "./contexts/ProvidersContext";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import "./Options.less";
import "./less/flex.less";
import SettingsContext from "./contexts/SettingsContext";
import useSetStorageEffect from "./hooks/useSetStorageEffect";

import {
  faEye as appearanceIcon,
  faSliders as behaviourIcon,
  faPlug as functionIcon,
  faPlusMinus as managementIcon,
} from "@fortawesome/free-solid-svg-icons";
import OptionsContainer from "./components/TopLevel/OptionsContainer";

/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

const tabs = {
  appearance: { id: "appearance", name: "Appearance", icon: appearanceIcon },
  behaviour: { id: "behaviour", name: "Behaviour", icon: behaviourIcon },
  function: { id: "function", name: "Function", icon: functionIcon },
  management: {
    id: "management",
    name: "Manage providers",
    icon: managementIcon,
  },
};

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
    <>
      <h1>Settings</h1>
      <div className={"app flex-container column"}>
        <TabContainer
          tabs={tabs}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <ProvidersContext.Provider value={{ providers, setProviders }}>
            <OptionsContainer selectedTab={selectedTab} />
          </ProvidersContext.Provider>
        </SettingsContext.Provider>
      </div>
    </>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<Options storedProviders={providers} storedOptions={options} />);
});
