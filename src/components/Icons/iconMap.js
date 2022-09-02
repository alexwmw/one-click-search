import {
  faCheck,
  faCheckCircle,
  faCog,
  faEllipsisVertical,
  faQuestion,
  faQuestionCircle,
  faSort,
  faTimes,
  faSliders,
  faPlug,
  faPlusMinus,
  faEye,
  faRecycle,
  faExclamationCircle,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = (type) => {
  return (
    {
      check: { iconClass: faCheck, iconTitle: "Tick icon" },
      checkCircle: { iconClass: faCheckCircle, iconTitle: "Tick icon" },
      close: { iconClass: faTimes, iconTitle: "Close icon" },
      edit: { iconClass: faEllipsisVertical, iconTitle: "Edit icon" },
      more: { iconClass: faEllipsisVertical, iconTitle: "More icon" },
      help: { iconClass: faQuestionCircle, iconTitle: "Help icon" },
      information: { iconClass: faCircleInfo, iconTitle: "Info icon" },
      faq: { iconClass: faQuestion, iconTitle: "Help icon" },
      settings: { iconClass: faCog, iconTitle: "Settings icon" },
      sort: { iconClass: faSort, iconTitle: "Sort icon" },
      reset: { iconClass: faRecycle, iconTitle: "Reset icon" },
      appearance: { iconClass: faEye, iconTitle: "Appearance settings icon" },
      behaviour: { iconClass: faSliders, iconTitle: "Behaviour settings icon" },
      function: { iconClass: faPlug, iconTitle: "Function settings icon" },
      advanced: { iconClass: faPlusMinus, iconTitle: "Advanced settings icon" },
      warning: { iconClass: faExclamationCircle, iconTitle: "Warning icon" },
    }[type] ?? {}
  );
};

export default iconMap;
