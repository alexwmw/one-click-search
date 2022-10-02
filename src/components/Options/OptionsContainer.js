import clsx from "clsx";
import AdvancedRows from "./AdvancedRows";
import OptionRows from "./OptionsRows";
import OptionsTitleArea from "./OptionstitleArea";
import information from "../../content/information.js";
import MarkdownMapper from "../Markdown/MarkdownMapper";
import ProvidersSorter from "../ProvidersSorter/ProvidersSorter";
import "./OptionsContainer.less";

function OptionsContainer(props) {
  const isInfoTab = props.selectedTab == props.tabs.info;
  const isSearchTab = props.selectedTab == props.tabs.search;
  const isAdvancedTab = props.selectedTab == props.tabs.advanced;
  const isOptionsTab = props.selectedTab.isOptionsTab;

  return (
    <div className={clsx("flex-container", "page", "options-container")}>
      <OptionsTitleArea
        selectedTab={props.selectedTab}
        isSearch={isSearchTab}
      />
      <div
        className={clsx("flex-container", "page", "options-container-inner")}
      >
        {isSearchTab && (
          <div className="providers-page-wrap">
            <ProvidersSorter />
          </div>
        )}
        {isOptionsTab && <OptionRows selectedTab={props.selectedTab} />}
        {isAdvancedTab && <AdvancedRows selectedTab={props.selectedTab} />}
        {isInfoTab && (
          <MarkdownMapper
            classes={["flex-container", "width-100", "column", "info-tab"]}
            mdArray={information}
          />
        )}
      </div>
    </div>
  );
}
export default OptionsContainer;
