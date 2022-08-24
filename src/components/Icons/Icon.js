import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import "./Icon.less";
import iconMap from "./iconMap";
const Icon = (props) => {
  const { iconClass, iconTitle } = iconMap(props.type || props.icon);

  return (
    <span className={props.className}>
      <FontAwesomeIcon
        icon={iconClass || props.icon}
        title={iconTitle || props.title}
        className={clsx("icon", props.type)}
      />
    </span>
  );
};

export default Icon;
