import { createRoot } from "react-dom/client";
import React, { useState, lazy } from "react";
import TabContainer from "./components/TopLevel/TabContainer";
import PageContainer from "./components/TopLevel/PageContainer";
import { ToastProvider } from "./contexts/ToastsContext";
import "./App.less";
import "./less/flex.less";

//const Content = lazy(() => import("./components/PageContainer"));

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const App = () => {
  // Tabs
  const [selectedTab, setSelectedTab] = useState(tabNames.icons);
  const tabNames = { icons: "Icon Order", controls: "Controls" };

  const tabSelectHandler = (tabName) => {
    setSelectedTab(tabName);
    // console.log("tab selection made");
  };

  return (
    // <ToastProvider>
    <div className={"flex-container height-app width-app column"}>
      <TabContainer
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <PageContainer tabNames={tabNames} selectedTab={selectedTab} />
    </div>
    //</ToastProvider>
  );
};

root.render(<App />);
