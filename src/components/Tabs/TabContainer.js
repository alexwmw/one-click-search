import Tab from "./Tab";
import "./TabContainer.less";
import Icon from "../Icons/Icon";
import clsx from "clsx";

const TabContainer = ({ tabs, selectedTab, onTabSelect }) => {
  const Tabs = Object.values(tabs).map((tab) => (
    <Tab
      key={tab.id}
      id={`${tab.id}-tab`}
      selected={selectedTab == tab}
      onClick={() => onTabSelect(tab.id)}
      border={"left"}
    >
      <Icon type={tab.icon} />
      <span className="tab-name">{tab.name}</span>
    </Tab>
  ));

  return <div className={clsx("tab-container", "flex-container")}>{Tabs}</div>;
};

export default TabContainer;
