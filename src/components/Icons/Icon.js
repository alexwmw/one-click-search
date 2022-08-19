import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Icon.less";
import iconMap from "./iconMap";
const Icon = (props) => {
  const { iconClass, iconTitle } = iconMap(props.type || props.icon);

  if (props.href) {
    return (
      <a href={props.href} target={props.newTab && "_blank"}>
        <FontAwesomeIcon
          icon={iconClass}
          title={iconTitle}
          className={`icon link-icon ${props.type ?? ""}`}
        />
      </a>
    );
  } else if (props.onClick) {
    return (
      <span onClick={props.onClick}>
        <FontAwesomeIcon
          icon={iconClass}
          title={iconTitle}
          className={`icon link-icon ${props.type ?? ""}`}
        />
      </span>
    );
  } else {
    return (
      <span>
        <FontAwesomeIcon
          icon={iconClass}
          title={iconTitle}
          className={`icon ${props.type ?? ""}`}
        />
      </span>
    );
  }
};

export default Icon;
