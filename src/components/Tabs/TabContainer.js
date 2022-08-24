import Tab from "./Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TabContainer.less";
import Icon from "../Icons/Icon";

const TabContainer = ({ tabs, selectedTab, onTabSelect }) => {
  const Tabs = Object.values(tabs).map((tab) => (
    <Tab
      key={tab.id}
      selected={selectedTab == tab}
      onClick={() => onTabSelect(tab.id)}
      border={"left"}
    >
      <Icon type={tab.icon} />
      {tab.name}
    </Tab>
  ));

  return (
    <div
      id={"tabContainer"}
      className={"tab-container flex-container column left"}
    >
      {Tabs}
    </div>
  );
};

export default TabContainer;
