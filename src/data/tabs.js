import {
  faEye as appearanceIcon,
  faSliders as behaviourIcon,
  faPlug as functionIcon,
  faPlusMinus as advancedIcon,
  // faListDots as providersIcon,
} from "@fortawesome/free-solid-svg-icons";

const tabs = {
  appearance: {
    id: "appearance",
    name: "Appearance",
    icon: appearanceIcon,
    isOptionsTab: true,
  },
  behaviour: {
    id: "behaviour",
    name: "Behaviour",
    icon: behaviourIcon,
    isOptionsTab: true,
  },
  function: {
    id: "function",
    name: "Function",
    icon: functionIcon,
    isOptionsTab: true,
  },
  advanced: {
    id: "advanced",
    name: "Advanced",
    icon: advancedIcon,
    isOptionsTab: false,
  },
};

export default tabs;
