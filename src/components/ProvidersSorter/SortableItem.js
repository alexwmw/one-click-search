import { useEffect, useState } from "react";
import clsx from "clsx";
import ProviderForm from "../Forms/ProviderForm";
import Icon from "../Icons/Icon";
import IconTrigger from "../Icons/IconTrigger";
import "./SortableItem.less";
import Img from "../Images/Img";

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
      <Img className="li-favicon" src={faviconUrl}></Img>
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
