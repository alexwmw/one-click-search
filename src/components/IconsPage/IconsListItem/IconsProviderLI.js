import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconsLI_Form from "./IconsLI_Form";

function IconsProviderLI(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickHandler = (e) => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <li
      data-id={props.key}
      data-object={props.obj}
      className={isExpanded && "expanded"}
    >
      <img src={props.faviconUrl || props.url + "favicon.ico"}></img>
      <span>{props.name}</span>
      <FontAwesomeIcon
        tabIndex={0}
        onClick={clickHandler}
        className={"fa-icon button editButton"}
        icon={!isExpanded ? editIcon : closeIcon}
      />
      <IconsLI_Form {...props} isExpanded={isExpanded}></IconsLI_Form>
    </li>
  );
}

export default IconsProviderLI;
