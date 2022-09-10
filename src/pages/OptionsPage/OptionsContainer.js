import ManagementRows from "./ManagementRows";
import OptionRows from "./OptionsRows";
import information from "../../content/information.js";
import MarkdownMapper from "../../components/Markdown/MarkdownMapper";
import ProvidersPage from "../ProvidersPage/ProvidersPage";
import clsx from "clsx";
import HelpIcon from "../../components/Tooltips/HelpIcon";
import "./OptionsContainer.less";

function OptionsContainer({ selectedTab, tabs }) {
  return (
    <div className={"flex-container page options-container"}>
      <div
        style={{ gap: "10px" }}
        className={clsx("flex-container", "row", "center", "gap-10")}
      >
        <h2>{selectedTab.nameLong ?? selectedTab.name} </h2>
        {selectedTab == tabs.search && <HelpIcon />}
      </div>
      <div className={"flex-container page options-container-inner"}>
        {selectedTab == tabs.search && (
          <div className="providers-page-wrap">
            <ProvidersPage />
          </div>
        )}
        {selectedTab.isOptionsTab && <OptionRows selectedTab={selectedTab} />}
        {selectedTab == tabs.advanced && (
          <ManagementRows selectedTab={selectedTab} />
        )}
        {selectedTab == tabs.info && (
          <MarkdownMapper
            classes={["flex-container", "width-100", "column"]}
            mdArray={information}
          />
        )}
      </div>
    </div>
  );
}
export default OptionsContainer;
