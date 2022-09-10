import { createRoot } from "react-dom/client";
import { useState, useReducer, useEffect } from "react";
import tabs from "./data/tabs.json";
import TabContainer from "./components/Tabs/TabContainer";
import ToastsContainer from "./components/Modals/ToastsContainer";
import OptionsContainer from "./pages/OptionsPage/OptionsContainer";
import OcsHeader from "./pages/OptionsPage/OcsHeader";
import Card from "./components/Cards/Card";
import ChromeContext from "./contexts/ChromeContext";
import ChromeDispatcher from "./modules/ChromeDispatcher";
import { applyTheme } from "./modules/Utilities";
import useChromeListener from "./hooks/useChromeListener";
import useChromeGet from "./hooks/useChromeGet";
import { ToastsContext, ToastsReducer } from "./reducers/ToastsReducer";

import "./App.less";
import "./Options.less";
import "./less/flex.less";
import "./less/theme.less";

/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

/** Define App */
const Options = () => {
  /** Context States */
  const [options, setOptions] = useState({});
  const [toasts, dispatchToasts] = useReducer(ToastsReducer, []);
  const dispatchChrome = ChromeDispatcher;

  /** Define tabs */
  const defaultTab = tabs.search;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useChromeGet(
    (result) => {
      setOptions(result.options);
    },
    ["options"]
  );

  useChromeListener(
    ({ oldValue, newValue }) => {
      setOptions(newValue);
      dispatchToasts({ type: "SETTING_UPDATED" });
    },
    ["options"]
  );

  useEffect(() => {
    const theme = options.theme?.value.toLowerCase();
    applyTheme(theme);
  }, [options.theme]);

  return (
    <ChromeContext.Provider value={{ options, dispatchChrome }}>
      <ToastsContext.Provider value={{ toasts, dispatchToasts }}>
        <div className={"options flex-container column"}>
          <ToastsContainer position={"right"} />
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
              {options && (
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
