import { createRoot } from "react-dom/client";
import { useState, lazy } from "react";
import "./less/app.less";
import "./less/_simple.less";
import OCScontrols from "./data/options.json";
import OCSproviders from "./data/providers.json";
import OCSfunctions from "./data/functions.json";
import TabRow from "./components/TabRow";
//import Content from "./components/Content";

const Content = lazy(() => import("./components/Content"));

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const App = () => {
  chrome.storage.sync.clear();

  const OCScombinedList = [...OCSproviders, ...OCSfunctions];

  // Tabs
  const tabNames = { icons: "Icon Order", controls: "Controls" };
  const [selectedTab, setSelectedTab] = useState(tabNames.icons);

  const tabSelectHandler = (tabName) => {
    setSelectedTab(tabName);
    console.log("tab selection made");
  };

  return (
    <div id={"app"} className={"flex-container height-app width-app column"}>
      <TabRow
        id={"tabRow"}
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <Content
        id={"content"}
        className={"content-padding"}
        tabNames={tabNames}
        selectedTab={selectedTab}
        listOfProviders={OCScombinedList}
      />
    </div>
  );
};

root.render(<App />);
