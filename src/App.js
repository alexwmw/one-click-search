import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import "./App.less";
import "/src/less/flex.less";
import ProvidersPage from "/src/pages/ProvidersPage/ProvidersPage";
import HelpModal from "./components/Modals/HelpModal";
import IconTrigger from "./components/Icons/IconTrigger";
import IconAnchor from "./components/Icons/IconAnchor";
import ChromeContext from "./contexts/ChromeContext";
import AlertsContext from "./contexts/AlertsContext";
import useChromeStorage from "./hooks/useChromeStorage";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = () => {
  /** Context States */
  const [chrome, dispatchChrome] = useChromeStorage(["providers"]);
  const [showHelp, setShowHelp] = useState(false);

  const alertHandler = {
    error: ({ title, messages }) => {
      alert(title);
    },
    confirm: ({ title, question }) => {
      return confirm(question);
    },
  };

  return (
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
        <AlertsContext.Provider value={alertHandler}>
          <ChromeContext.Provider value={{ chrome, dispatchChrome }}>
            {chrome && <ProvidersPage />}
          </ChromeContext.Provider>
        </AlertsContext.Provider>
      </div>
    </div>
  );
};

//** Get data from storage and pass to App for render */
root.render(<App />);
