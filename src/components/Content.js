import React from "react";
import { FlexContainer } from "./basic-components/BasicStyledComponents";
import IconsPage from "./IconsPage/IconsPage";
import ControlsPage from "./ControlsPage/ControlsPage";

function Content(props) {
  return (
    <FlexContainer>
      {props.selectedTab == props.tabNames.icons && (
        <IconsPage data={props.iconSectionsData}></IconsPage>
      )}
      {props.selectedTab == props.tabNames.controls && (
        <ControlsPage></ControlsPage>
      )}
    </FlexContainer>
  );
}

export default Content;
