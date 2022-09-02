import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import clsx from "clsx";
import ProvidersPage from "./pages/ProvidersPage/ProvidersPage";
import HelpModal from "./components/Modals/HelpModal";
import IconTrigger from "./components/Icons/IconTrigger";
import IconAnchor from "./components/Icons/IconAnchor";
import ChromeContext from "./contexts/ChromeContext";
import AlertsContext from "./contexts/AlertsContext";
import useChromeListener from "./hooks/useChromeListener";
import useChromeGet from "./hooks/useChromeGet";
import ChromeDispatcher from "./modules/ChromeDispatcher";
import { applyTheme } from "./modules/Utilities";
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

  /** Get theme on first render */
  useChromeGet(
    (result) => {
      applyTheme(result.options.theme.value.toLowerCase());
    },
    ["options"]
  );

  const alertHandler = {
    error: ({ title, messages }) => {
      alert(title);
    },
    confirm: ({ title, question }) => {
      return confirm(question);
    },
  };

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
    <div
      className={clsx(
        "app",
        "flex-container",
        "height-app",
        "width-100",
        "column"
      )}
    >
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
        <AlertsContext.Provider value={alertHandler}>
          <ChromeContext.Provider value={{ providers, dispatchChrome }}>
            <ProvidersPage />
          </ChromeContext.Provider>
        </AlertsContext.Provider>
      </div>
    </div>
  );
};

//** Get data from storage and pass to App for render */
root.render(<App />);
