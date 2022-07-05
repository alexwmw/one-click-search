import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";

import ProviderForm from "./IconsListItem_Provider_Form";

function IconsListItem_Provider({ key, provider }) {
  /** State and local data */
  const [isExpanded, setIsExpanded] = useState(false);
  const faviconUrl =
    provider.faviconUrl || `https://${provider.hostname}/favicon.ico`;

  const toggleExpanded = (e) => {
    setIsExpanded((expanded) => !expanded);
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
      <span>{provider.name}</span>
      {ExpandButton}
      {isExpanded && <ProviderForm {...provider}></ProviderForm>}
    </li>
  );
}

export default IconsListItem_Provider;
