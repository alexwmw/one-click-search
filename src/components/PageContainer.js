import IconsPage from "./IconsPage/IconsPage";
import ControlsPage from "./ControlsPage/ControlsPage";
import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";

function PageContainer(props) {
  const listOfProviders = [...OCSproviders, ...OCSfunctions];
  return (
    <div
      style={{ padding: "10px" }}
      className={"flex-container content-padding"}
      id="pageContainer"
    >
      {props.selectedTab == props.tabNames.icons && (
        <IconsPage listOfProviders={listOfProviders}></IconsPage>
      )}
      {props.selectedTab == props.tabNames.controls && (
        <ControlsPage></ControlsPage>
      )}
    </div>
  );
}

export default PageContainer;
