import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "./Icon.less";
import iconMap from "./iconMap";
const IconTrigger = (props) => {
  const { iconClass, iconTitle } = iconMap(props.type);

  return (
    <span className={props.className} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={iconClass || props.icon}
        title={iconTitle || props.title}
        className={clsx("icon", "trigger-icon", props.type)}
      />
    </span>
  );
};

export default IconTrigger;
