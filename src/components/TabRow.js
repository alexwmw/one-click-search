import { FlexContainer } from "./basic-components/BasicStyledComponents";
import Tab from "./Tab";

const TabRow = (props) => {
  const iconsSelectHandler = () => {
    console.log("icon clicked");
    props.onTabSelect(props.tabNames.icons);
  };

  const controlsSelectHandler = () => {
    console.log("controls clicked");
    props.onTabSelect(props.tabNames.controls);
  };

  return (
    <FlexContainer direction="row">
      <Tab
        selected={props.selectedTab == props.tabNames.icons}
        onClick={iconsSelectHandler}
      >
        {props.tabNames.icons}
      </Tab>
      <Tab
        selected={props.selectedTab == props.tabNames.controls}
        onClick={controlsSelectHandler}
      >
        {props.tabNames.controls}
      </Tab>
    </FlexContainer>
  );
};

export default TabRow;
