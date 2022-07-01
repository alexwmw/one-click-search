import { createRoot } from "react-dom/client";
import React, { useState, lazy } from "react";
import "./less/app.less";
import "./less/_simple.less";
import OCScontrols from "./data/options.json";

import TabContainer from "./components/TabContainer";
import Spinner from "./components/Spinner";
import PageContainer from "./components/PageContainer";

//const Content = lazy(() => import("./components/PageContainer"));

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const App = () => {
  //chrome.storage.sync.clear();

  // Tabs
  const tabNames = { icons: "Icon Order", controls: "Controls" };
  const [selectedTab, setSelectedTab] = useState(tabNames.icons);

  const tabSelectHandler = (tabName) => {
    setSelectedTab(tabName);
    console.log("tab selection made");
  };

  return (
    <div className={"flex-container height-app width-app column"}>
      <TabContainer
        id={"tabRow"}
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <React.Suspense fallback={<Spinner />}>
        <PageContainer
          id={"content"}
          className={"content-padding"}
          tabNames={tabNames}
          selectedTab={selectedTab}
        />
      </React.Suspense>
    </div>
  );
};

root.render(<App />);
