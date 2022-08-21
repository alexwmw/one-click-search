import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import ProvidersContext from "/src/contexts/ProvidersContext";
import "./App.less";
import "/src/less/flex.less";
import SettingsContext from "/src/contexts/SettingsContext";
import useSetStorageEffect from "/src/hooks/useSetStorageEffect";
import ProvidersPage from "/src/pages/ProvidersPage/ProvidersPage";
import Icon from "./components/Icons/Icon";
import Modal from "./components/Modals/Modal";
import help from "./content/help";
import HelpModal from "./components/Modals/HelpModal";
import IconTrigger from "./components/Icons/IconTrigger";
import IconAnchor from "./components/Icons/IconAnchor";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = ({ storedProviders, storedOptions }) => {
  /** Context States */
  const [providers, setProviders] = useState(storedProviders);
  const [settings, setSettings] = useState(storedOptions);

  const [showHelp, setShowHelp] = useState(false);

  useSetStorageEffect(
    {
      providers: providers.filter((p) => !p.delete),
      options: settings,
    },
    ["log"]
  );

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ProvidersContext.Provider value={{ providers, setProviders }}>
        <div className={"app flex-container height-app width-100 column"}>
          <div className="title-bar flex-container row space-between center">
            <div className="flex-container row center">
              <img src={"/icons/icon16.png"}></img>
              <h2>One Click Search</h2>
            </div>
            <div className="flex-container row center">
              <IconTrigger onClick={() => setShowHelp(true)} type={"help"} />
              <IconAnchor href={"options.html"} newTab type={"settings"} />
            </div>
          </div>
          <div className="page-container">
            <div className="flex-container width-100 right">
              <HelpModal show={showHelp} close={() => setShowHelp(false)} />
            </div>
            <ProvidersPage />
          </div>
        </div>
      </ProvidersContext.Provider>
    </SettingsContext.Provider>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(["providers", "options"], ({ providers, options }) => {
  root.render(<App storedProviders={providers} storedOptions={options} />);
});
