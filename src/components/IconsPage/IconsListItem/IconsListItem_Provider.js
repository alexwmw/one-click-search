import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";

import ProviderForm from "./IconsListItem_Provider_Form";

function IconsListItem_Provider({ key, provider, visibilityList }) {
  /** State and local data */
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [thisProvider, setProvider] = useState(provider);
  const faviconUrl =
    thisProvider.faviconUrl || `https://${thisProvider.hostname}/favicon.ico`;

  const toggleExpanded = () => {
    if (isUnsaved) {
      if (confirm("Unsaved changes will be lost")) {
        setIsExpanded(false);
        setIsUnsaved(false);
      } else {
        setIsExpanded(true);
      }
    } else {
      setIsExpanded((expanded) => !expanded);
      setIsUnsaved(false);
    }
  };

  const ExpandButton = (
    <button onClick={toggleExpanded}>
      <Icon className={"fa-icon"} icon={!isExpanded ? editIcon : closeIcon} />
    </button>
  );

  return (
    <li
      data-id={key}
      className={`sortableItem ${isExpanded ? "expanded" : ""}`}
    >
      <img src={faviconUrl}></img>
      <span>{thisProvider.name}</span>
      {ExpandButton}
      {isExpanded && (
        <ProviderForm
          provider={thisProvider}
          visibilityList={visibilityList}
          setParentProvider={setProvider}
          setIsUnsaved={setIsUnsaved}
        ></ProviderForm>
      )}
    </li>
  );
}

export default IconsListItem_Provider;
