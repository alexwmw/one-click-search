import {
  faCheck,
  faCheckCircle,
  faCircleInfo,
  faCog,
  faEllipsisVertical,
  faExclamationTriangle,
  faEye,
  faFlask,
  faFloppyDisk,
  faMinus,
  faMoon,
  faPlug,
  faPlus,
  faQuestion,
  faQuestionCircle,
  faRecycle,
  faSliders,
  faSort,
  faSun,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = (type) => {
  return (
    {
      add: { iconClass: faPlus, iconTitle: "Add icon" },
      advanced: { iconClass: faFlask, iconTitle: "Advanced settings icon" },
      appearance: { iconClass: faEye, iconTitle: "Appearance settings icon" },
      behaviour: { iconClass: faSliders, iconTitle: "Behaviour settings icon" },
      check: { iconClass: faCheck, iconTitle: "Tick icon" },
      checkCircle: { iconClass: faCheckCircle, iconTitle: "Tick icon" },
      close: { iconClass: faTimes, iconTitle: "Close icon" },
      collapse: { iconClass: faMinus, iconTitle: "Collapse icon" },
      darkMode: { iconClass: faMoon, iconTitle: "Dark mode icon" },
      delete: { iconClass: faTrashAlt, iconTitle: "Close icon" },
      edit: { iconClass: faEllipsisVertical, iconTitle: "Edit icon" },
      expand: { iconClass: faPlus, iconTitle: "Expand icon" },
      faq: { iconClass: faQuestion, iconTitle: "Help icon" },
      function: { iconClass: faPlug, iconTitle: "Function settings icon" },
      help: { iconClass: faQuestionCircle, iconTitle: "Help icon" },
      information: { iconClass: faCircleInfo, iconTitle: "Info icon" },
      lightMode: { iconClass: faSun, iconTitle: "Light mode icon" },
      more: { iconClass: faEllipsisVertical, iconTitle: "More icon" },
      reset: { iconClass: faRecycle, iconTitle: "Reset icon" },
      save: { iconClass: faFloppyDisk, iconTitle: "Save icon" },
      settings: { iconClass: faCog, iconTitle: "Settings icon" },
      sort: { iconClass: faSort, iconTitle: "Sort icon" },
      stop: { iconClass: faTimes, iconTitle: "Stop icon" },
      warning: { iconClass: faExclamationTriangle, iconTitle: "Warning icon" },
    }[type] ?? {}
  );
};

export default iconMap;
