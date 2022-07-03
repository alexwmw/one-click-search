import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconsListItem_Provider_Form from "./IconsListItem_Provider_Form";

function IconsListItem_Provider(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickHandler = (e) => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <li
      data-id={props.key}
      data-object={props.obj}
      className={isExpanded ? "expanded" : null}
    >
      <img
        src={props.faviconUrl || `https://${props.hostname}/favicon.ico`}
      ></img>
      <span>{props.name}</span>
      <FontAwesomeIcon
        tabIndex={0}
        onClick={clickHandler}
        className={"fa-icon button editButton"}
        icon={!isExpanded ? editIcon : closeIcon}
      />
      <IconsListItem_Provider_Form
        {...props}
        isExpanded={isExpanded}
      ></IconsListItem_Provider_Form>
    </li>
  );
}

export default IconsListItem_Provider;
