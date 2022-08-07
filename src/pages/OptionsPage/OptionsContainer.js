import ManagementRows from "./ManagementRows";
import "./OptionsContainer.less";
import OptionRows from "./OptionsRows";

function OptionsContainer({ selectedTab, tabs }) {


  return (
    <div className={"flex-container page options-container"}>
      <h2>{selectedTab.name} </h2>
      <div className={"flex-container page options-container-inner"}>
        {selectedTab !== tabs.advanced && (
          <OptionRows selectedTab={selectedTab} />
        )}
        {selectedTab == tabs.advanced && (
          <ManagementRows selectedTab={selectedTab} />
        )}
      </div>
    </div>
  );
}
export default OptionsContainer;
