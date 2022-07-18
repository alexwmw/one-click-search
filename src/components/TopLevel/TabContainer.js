import Tab from "./Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList as iconsIcon,
  faCog as controlsIcon,
  faPaintBrush as colorIcon,
} from "@fortawesome/free-solid-svg-icons";
import "./TabContainer.less";

const TabRow = (props) => {
  const iconsSelectHandler = () => {
    props.onTabSelect(props.tabNames.icons);
  };

  const controlsSelectHandler = () => {
    props.onTabSelect(props.tabNames.controls);
  };

  const colorsSelectHandler = () => {
    props.onTabSelect(props.tabNames.color);
  };

  const IconsIcon = <FontAwesomeIcon icon={iconsIcon} />;
  const ControlsIcon = <FontAwesomeIcon icon={controlsIcon} />;
  const ColorsIcon = <FontAwesomeIcon icon={colorIcon} />;

  return (
    <div id={"tabContainer"} className={"flex-container row"}>
      <Tab
        selected={props.selectedTab == props.tabNames.icons}
        onClick={iconsSelectHandler}
      >
        {IconsIcon}
        {props.tabNames.icons}
      </Tab>
      <Tab
        selected={props.selectedTab == props.tabNames.controls}
        onClick={controlsSelectHandler}
      >
        {ControlsIcon}
        {props.tabNames.controls}
      </Tab>
      <Tab
        selected={props.selectedTab == props.tabNames.color}
        onClick={colorsSelectHandler}
      >
        {ColorsIcon}
        {props.tabNames.color}
      </Tab>
    </div>
  );
};

export default TabRow;
