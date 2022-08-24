import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import ProviderForm from "../../components/Forms/ProviderForm";
import "./SortableItem.less";
import Icon from "../../components/Icons/Icon";
import IconTrigger from "../../components/Icons/IconTrigger";

function SortableItem({ provider, openItem, setOpenItem }) {
  /** State and local data */
  const [isExpanded, setIsExpanded] = useState(false);

  const faviconUrl =
    provider.faviconUrl || `https://${provider.hostname}/favicon.ico`;

  const toggleExpanded = () => {
    setIsExpanded((expanded) => !expanded);
  };

  useEffect(() => {
    if (openItem !== provider.name) {
      setIsExpanded(false);
    }
  }, [openItem]);

  return (
    <li
      data-id={provider.name}
      className={clsx("sortable-item", isExpanded && "expanded")}
      onClick={(e) => setOpenItem(provider.name)}
      onDragStart={(e) => setOpenItem(null)}
    >
      <Icon type={"sort"} />
      <img src={faviconUrl}></img>
      <span>{provider.name}</span>
      {provider.role === "provider" && (
        <>
          <IconTrigger
            className={clsx("more-btn")}
            onClick={toggleExpanded}
            icon={!isExpanded ? editIcon : closeIcon}
          />

          {isExpanded && (
            <ProviderForm
              provider={provider}
              closeForm={() => setIsExpanded(false)}
            ></ProviderForm>
          )}
        </>
      )}
    </li>
  );
}

export default SortableItem;
