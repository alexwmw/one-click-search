import Tab from "./Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TabContainer.less";

const TabContainer = ({ tabs, selectedTab, onTabSelect }) => {
  const tabClickHandler = (tabId) => {
    onTabSelect(tabs[tabId]);
  };

  const Tabs = Object.keys(tabs).map((tabId) => (
    <Tab
      key={tabId}
      selected={selectedTab == tabs[tabId]}
      onClick={() => tabClickHandler(tabId)}
    >
      <FontAwesomeIcon icon={tabs[tabId].icon} />
      {tabs[tabId].name}
    </Tab>
  ));

  return (
    <div id={"tabContainer"} className={"flex-container row"}>
      {Tabs}
    </div>
  );
};

export default TabContainer;
