import { createRoot } from "react-dom/client";
import { useState, useReducer } from "react";
import TabContainer from "./components/Tabs/TabContainer";
import OptionsContainer from "./pages/OptionsPage/OptionsContainer";
import OcsHeader from "./pages/OptionsPage/OcsHeader";
import tabs from "./data/tabs.json";
import ToastsContainer from "./components/Modals/ToastsContainer";
import Card from "./components/Cards/Card";
import ChromeContext from "./contexts/ChromeContext";
import useChromeStorage from "./hooks/useChromeStorage";
import useChromeListener from "./hooks/useChromeListener";
import { ToastsContext, ToastsReducer } from "./reducers/ToastsReducer";

import "./App.less";
import "./Options.less";
import "./less/flex.less";

/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

/** Define App */
const Options = () => {
  /** Context States */
  const [chrome, dispatchChrome] = useChromeStorage(["options"]);
  const [toasts, dispatchToasts] = useReducer(ToastsReducer, []);

  /** Define tabs */
  const defaultTab = tabs.appearance;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useChromeListener(
    ({ oldValue, newValue }, key) => {
      dispatchToasts({
        type: "CUSTOM_SAVED",
        message: "options changed",
      });
    },
    ["options"]
  );

  return (
    <ChromeContext.Provider value={{ chrome, dispatchChrome }}>
      <ToastsContext.Provider value={{ toasts, dispatchToasts }}>
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
                  onTabSelect={(tabId) => setSelectedTab(tabs[tabId])}
                />
              </Card>
            </div>
            <div className="main-column">
              {chrome && (
                <OptionsContainer selectedTab={selectedTab} tabs={tabs} />
              )}
            </div>
          </div>
        </div>
      </ToastsContext.Provider>
    </ChromeContext.Provider>
  );
};

//** Get data from storage and pass to App for render */
root.render(<Options />);
