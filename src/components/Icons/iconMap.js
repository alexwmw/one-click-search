import {
  faCheck,
  faCog,
  faEllipsisVertical,
  faQuestionCircle,
  faSort,
  faTimes,
  faSliders,
  faPlug,
  faPlusMinus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = (type) => {
  return (
    {
      check: { iconClass: faCheck, iconTitle: "Tick icon" },
      close: { iconClass: faTimes, iconTitle: "Close icon" },
      edit: { iconClass: faEllipsisVertical, iconTitle: "Edit icon" },
      more: { iconClass: faEllipsisVertical, iconTitle: "More icon" },
      help: { iconClass: faQuestionCircle, iconTitle: "Help icon" },
      settings: { iconClass: faCog, iconTitle: "Settings icon" },
      sort: { iconClass: faSort, iconTitle: "Sort icon" },
      appearance: { iconClass: faEye, iconTitle: "Appearance settings icon" },
      behaviour: { iconClass: faSliders, iconTitle: "Behaviour settings icon" },
      function: { iconClass: faPlug, iconTitle: "Function settings icon" },
      advanced: { iconClass: faPlusMinus, iconTitle: "Advanced settings icon" },
    }[type] ?? {}
  );
};

export default iconMap;
