import { createRoot } from "react-dom/client";
import { useState, useReducer, useEffect } from "react";
import tabs from "./data/tabs.json";
import TabContainer from "./components/Tabs/TabContainer";
import ToastsContainer from "./components/Modals/ToastsContainer";
import OptionsContainer from "./components/Options/OptionsContainer";
import OcsHeader from "./components/Headers/Header";
import Card from "./components/Cards/Card";
import ChromeContext from "./contexts/ChromeContext";
import useChromeListener from "./hooks/useChromeListener";
import useChromeGet from "./hooks/useChromeGet";
import { ToastsContext, ToastsReducer } from "./reducers/ToastsReducer";
import ChromeDispatcher from "./modules/ChromeDispatcher";
import { applyTheme } from "./modules/Utilities";
import "./App.less";
import "./Options.less";
import "./less/flex.less";
import "./less/theme.less";

/** Define root */
const rootElement = document.getElementById("options");
const root = createRoot(rootElement);

/** Define App */
const Options = () => {
  const [options, setOptions] = useState({});
  const [toasts, dispatchToasts] = useReducer(ToastsReducer, []);

  /** Custom dispatcher */
  const dispatchChrome = ChromeDispatcher;

  /** Define tabs */
  const defaultTab = tabs.search;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  /** Custom hook; Set options on first render */
  useChromeGet(
    (result) => {
      setOptions(result.options);
    },
    ["options"]
  );

  /** Custom hook; when a stored option value changes */
  useChromeListener(
    ({ oldValue, newValue }) => {
      setOptions(newValue);
      dispatchToasts({ type: "SETTING_UPDATED" });
    },
    ["options"]
  );

  /** Apply theme styles when theme value is changed */
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

//** Render options page */
root.render(<Options />);
