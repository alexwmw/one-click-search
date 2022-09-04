import ManagementRows from "./ManagementRows";
import "./OptionsContainer.less";
import OptionRows from "./OptionsRows";
import information from "../../content/information.js";

function OptionsContainer({ selectedTab, tabs }) {
  return (
    <div className={"flex-container page options-container"}>
      <h2>{selectedTab.name} </h2>
      <div className={"flex-container page options-container-inner"}>
        {selectedTab.isOptionsTab && <OptionRows selectedTab={selectedTab} />}
        {selectedTab == tabs.advanced && (
          <ManagementRows selectedTab={selectedTab} />
        )}
        {selectedTab == tabs.info && information}
      </div>
    </div>
  );
}
export default OptionsContainer;
