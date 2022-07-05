import { createRoot } from "react-dom/client";
import React, { useState, lazy } from "react";
import "./App.less";
import "./less/flex.less";

import TabContainer from "./components/TabContainer";
import Spinner from "./components/UX/Spinner";
import PageContainer from "./components/PageContainer";
import ToastContainer from "./components/UX/ToastContainer";

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
    // console.log("tab selection made");
  };

  return (
    <div className={"flex-container height-app width-app column"}>
      <ToastContainer></ToastContainer>
      <TabContainer
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <React.Suspense fallback={<Spinner />}>
        <PageContainer tabNames={tabNames} selectedTab={selectedTab} />
      </React.Suspense>
    </div>
  );
};

root.render(<App />);
