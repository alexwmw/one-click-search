import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
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
      className={`${isExpanded ? "expanded" : ""}`}
    >
      <img src={props.faviconUrl || props.url + "favicon.ico"}></img>
      <span>{props.name}</span>
      <FontAwesomeIcon
        onClick={clickHandler}
        className={"fa-icon"}
        icon={!isExpanded ? editIcon : closeIcon}
      />
      <IconsLI_Form isOpen={`${isExpanded ? "true" : "false"}`}></IconsLI_Form>
    </li>
  );
}

export default IconsProviderLI;
