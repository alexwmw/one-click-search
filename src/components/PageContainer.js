import IconsPage from "./IconsPage/IconsPage";
import ControlsPage from "./ControlsPage/ControlsPage";

function PageContainer(props) {
  return (
    <div
      style={{ padding: "10px" }}
      className={"flex-container content-padding"}
      id="pageContainer"
    >
      {props.selectedTab == props.tabNames.icons && <IconsPage></IconsPage>}
      {props.selectedTab == props.tabNames.controls && (
        <ControlsPage></ControlsPage>
      )}
    </div>
  );
}

export default PageContainer;
