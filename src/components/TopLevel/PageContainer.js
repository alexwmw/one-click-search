import IconsPage from "../IconsPage/IconsPage";
import ControlsPage from "../ControlsPage/ControlsPage";

function PageContainer({ tabNames, selectedTab }) {
  return (
    <div className={"flex-container"} id="pageContainer">
      {selectedTab == tabNames.icons && <IconsPage />}
      {selectedTab == tabNames.controls && <ControlsPage />}
    </div>
  );
}

export default PageContainer;
