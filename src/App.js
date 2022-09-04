import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ProvidersPage from "./pages/ProvidersPage/ProvidersPage";
import AppAlerts from "./pages/ProvidersPage/AppAlerts";
import Header from "./pages/OptionsPage/OcsHeader";
import HelpModal from "./components/Modals/HelpModal";
import IconTrigger from "./components/Icons/IconTrigger";
import IconAnchor from "./components/Icons/IconAnchor";
import ChromeContext from "./contexts/ChromeContext";
import AlertsContext from "./contexts/AlertsContext";
import useChromeListener from "./hooks/useChromeListener";
import useChromeGet from "./hooks/useChromeGet";
import ChromeDispatcher from "./modules/ChromeDispatcher";
import { get } from "./modules/Utilities";
import "./App.less";
import "./less/flex.less";
import "./less/theme.less";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = () => {
  /** Context States */
  const [showHelp, setShowHelp] = useState(false);
  const [providers, setProviders] = useState([]);
  const dispatchChrome = ChromeDispatcher;
  const { alertHandler, AlertProvider } = AppAlerts();

  /** Get providers on first render */
  useChromeGet(
    (result) => {
      setProviders(result.providers);
    },
    ["providers"]
  );

  /** Update providers when changes occur elsewhere in the extension */
  useChromeListener(
    ({ oldValue, newValue }) => {
      setProviders(newValue);
    },
    ["providers"]
  );

  return (
    <div className={clsx("app", "flex-container", "column")}>
      <AlertProvider />
      <HelpModal show={showHelp} close={() => setShowHelp(false)} />

      <Header>
        <div className={clsx("icons-group", "flex-container", "row", "center")}>
          <IconTrigger onClick={() => setShowHelp(true)} type={"help"} />
          <IconAnchor href={"options.html"} newTab type={"settings"} />
        </div>
      </Header>

      <AlertsContext.Provider value={alertHandler}>
        <ChromeContext.Provider value={{ providers, dispatchChrome }}>
          <ProvidersPage />
        </ChromeContext.Provider>
      </AlertsContext.Provider>
    </div>
  );
};

//** Get options from storage, set theme and render App  */
get(["options"], ({ options: { theme } }) => {
  const html = document.querySelector("html");
  const mode = theme.value.toLowerCase();
  html.dataset.theme = `theme-${mode}`;
  root.render(<App />);
});
