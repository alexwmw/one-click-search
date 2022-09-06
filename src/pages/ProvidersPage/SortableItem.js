import { useEffect, useState } from "react";
import clsx from "clsx";
import ProviderForm from "../../components/Forms/ProviderForm";
import Icon from "../../components/Icons/Icon";
import IconTrigger from "../../components/Icons/IconTrigger";
import "./SortableItem.less";

function SortableItem({ provider, openItem, setOpenItem }) {
  /** State and local data */
  const [isExpanded, setIsExpanded] = useState(false);

  const faviconUrl =
    provider.faviconUrl || `http://${provider.hostname}/favicon.ico`;

  const toggleExpanded = () => {
    setIsExpanded((expanded) => !expanded);
  };

  useEffect(() => {
    if (document.getElementsByClassName("expanded").length > 0) {
      document.body.classList.add("expanded-open");
    } else {
      document.body.classList.remove("expanded-open");
    }
  }, [isExpanded]);

  useEffect(() => {
    if (openItem !== provider.name) {
      setIsExpanded(false);
    }
  }, [openItem]);

  /** on Unmount  */
  useEffect(() => () => {
    document.body.classList.remove("expanded-open");
  });

  return (
    <li
      title={
        provider.onlyVisible && !isExpanded
          ? "Cannot move only visible item"
          : ""
      }
      data-id={provider.name}
      className={clsx(
        "sortable-item",
        isExpanded && ["expanded", "undraggable"],
        provider.onlyVisible && "undraggable"
      )}
      onClick={(e) => setOpenItem(provider.name)}
      onDragStart={(e) => setOpenItem(null)}
    >
      <Icon className={"li-sort-icon"} type={"sort"} />
      <img className="li-favicon" src={faviconUrl}></img>
      <span className="li-provider-name">{provider.name}</span>
      <IconTrigger
        className={clsx("li-expand-btn", "undraggable")}
        onClick={toggleExpanded}
        type={!isExpanded ? "expand" : "collapse"}
      />
      {isExpanded && (
        <ProviderForm
          provider={provider}
          closeForm={() => setIsExpanded(false)}
        ></ProviderForm>
      )}
    </li>
  );
}

export default SortableItem;
