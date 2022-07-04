import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProviderForm from "./IconsListItem_Provider_Form";

function IconsListItem_Provider({ key, provider }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickHandler = (e) => {
    setIsExpanded((expanded) => !expanded);
  };

  const faviconUrl =
    provider.faviconUrl || `https://${provider.hostname}/favicon.ico`;

  const expandButton = (
    <button onClick={clickHandler}>
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
      {expandButton}
      {isExpanded && <ProviderForm {...provider}></ProviderForm>}
    </li>
  );
}

export default IconsListItem_Provider;
