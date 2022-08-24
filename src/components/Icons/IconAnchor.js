import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "./Icon.less";
import iconMap from "./iconMap";
const IconAnchor = (props) => {
  const { iconClass, iconTitle } = iconMap(props.type || props.icon);

  return (
    <a
      className={props.className}
      href={props.href}
      target={props.newTab && "_blank"}
    >
      <FontAwesomeIcon
        icon={iconClass || props.icon}
        title={iconTitle || props.title}
        className={clsx("icon", "link-icon", props.type)}
      />
    </a>
  );
};

export default IconAnchor;
