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
import { applyTheme, get } from "./modules/Utilities";
import "./App.less";
import "./less/flex.less";
import "./less/theme.less";
import Confirm from "./components/Modals/Confirm";
import Alert from "./components/Modals/Alert";
import { useEffect } from "react";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = ({ theme }) => {
  /** Immediately set theme */
  useEffect(() => {
    const html = document.querySelector("html");
    html.dataset.theme = `theme-${theme}`;
  }, []);

  /** Context States */
  const [showHelp, setShowHelp] = useState(false);
  const [providers, setProviders] = useState([]);
  const [confirmData, setConfirmData] = useState({ isOpen: false });
  const [alertData, setAlertData] = useState({ isOpen: false });
  const dispatchChrome = ChromeDispatcher;

  const alertHandler = {
    error: ({ title, messages }) => {
      setAlertData({
        isOpen: true,
        title: title,
        children: messages.map((p) => <p>{p}</p>),
      });
    },
    confirm: ({ title, question, onProceed }) => {
      setConfirmData({
        isOpen: true,
        title: title,
        body: question,
        onProceed: () => {
          onProceed();
          setConfirmData({ isOpen: false });
        },
      });
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
      <div className="alerts-container">
        <Confirm
          {...confirmData}
          hasTitleBar={true}
          openAsModal={true}
          onClose={() => setConfirmData({ isOpen: false })}
        />
        <Alert
          {...alertData}
          hasTitleBar={true}
          onClose={() => setAlertData({ isOpen: false })}
          isModal={true}
          classes={"error-alert"}
          openAsModal={true}
        />
      </div>
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
get(["options"], ({ options }) => {
  root.render(<App theme={options.theme.value.toLowerCase()} />);
});
