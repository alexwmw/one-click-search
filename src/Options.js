import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import TabContainer from "./components/Tabs/TabContainer";
import OptionsContainer from "./pages/OptionsPage/OptionsContainer";
import OcsHeader from "./pages/OptionsPage/OcsHeader";
import tabs from "./data/tabs.json";
import { useReducer } from "react";
import ToastsContainer from "./components/Modals/ToastsContainer";
import Card from "./components/Cards/Card";
import ChromeContext from "./contexts/ChromeContext";
import ChromeReducer from "./reducers/ChromeReducer";
import { ToastsProvider } from "./reducers/ToastsReducer";

import "./App.less";
import "./Options.less";
import "./less/flex.less";

/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

/** Define App */
const Options = ({ storage }) => {
  /** Context States */
  const [chrome, dispatchChrome] = useReducer(ChromeReducer, storage);

  /** Define tabs */
  const defaultTab = tabs.appearance;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <ChromeContext.Provider value={{ chrome, dispatchChrome }}>
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
                  onTabSelect={(tabId) => setSelectedTab(tabs[tabId])}
                />
              </Card>
            </div>
            <div className="main-column">
              {/* <OptionsContainer selectedTab={selectedTab} tabs={tabs} /> */}
            </div>
          </div>
        </div>
      </ToastsProvider>
    </ChromeContext.Provider>
  );
};

//** Get data from storage and pass to App for render */
chrome.storage.sync.get(null, (result) => {
  root.render(<Options storage={result} />);
});
