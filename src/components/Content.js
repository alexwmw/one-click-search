import IconsPage from "./IconsPage/IconsPage";
import ControlsPage from "./ControlsPage/ControlsPage";

function Content(props) {
  return (
    <div className={"flex-container content-padding"} id={props.id}>
      {props.selectedTab == props.tabNames.icons && (
        <IconsPage listOfProviders={props.listOfProviders}></IconsPage>
      )}
      {props.selectedTab == props.tabNames.controls && (
        <ControlsPage></ControlsPage>
      )}
    </div>
  );
}

export default Content;
