import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProviderForm from "./IconsListItem_Provider_Form";

function IconsListItem_Provider(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickHandler = (e) => {
    setIsExpanded((expanded) => !expanded);
  };

  const faviconUrl =
    props.faviconUrl || `https://${props.hostname}/favicon.ico`;

  const expandButton = (
    <button onClick={clickHandler}>
      <Icon
        className={"fa-icon"}
        icon={!isExpanded ? editIcon : closeIcon}
      />
    </button>
  );

  return (
    <li className={isExpanded ? "expanded" : null}>
      <img src={faviconUrl}></img>
      <span>{props.name}</span>
      {expandButton}
      {isExpanded && <ProviderForm {...props}></ProviderForm>}
    </li>
  );
}

export default IconsListItem_Provider;
