import {
  faCog,
  faEllipsisVertical,
  faQuestionCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = (type) => {
  const icon = {
    close: { iconClass: faTimes, iconTitle: "Close icon" },
    edit: { iconClass: faEllipsisVertical, iconTitle: "Edit icon" },
    more: { iconClass: faEllipsisVertical, iconTitle: "More icon" },
    help: { iconClass: faQuestionCircle, iconTitle: "Help icon" },
    settings: { iconClass: faCog, iconTitle: "Settings icon" },
  };

  return icon[type] || { iconClass: type, iconTitle: "Icon" };
};

export default iconMap;
