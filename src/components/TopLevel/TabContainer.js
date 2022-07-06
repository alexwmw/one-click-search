import Tab from "./Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList as iconsIcon,
  faCog as controlsIcon,
} from "@fortawesome/free-solid-svg-icons";
import "./TabContainer.less";

const TabRow = (props) => {
  const iconsSelectHandler = () => {
    console.log("icon clicked");
    props.onTabSelect(props.tabNames.icons);
  };

  const controlsSelectHandler = () => {
    console.log("controls clicked");
    props.onTabSelect(props.tabNames.controls);
  };

  const IconsIcon = <FontAwesomeIcon icon={iconsIcon} />;
  const ControlsIcon = <FontAwesomeIcon icon={controlsIcon} />;

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
    </div>
  );
};

export default TabRow;
