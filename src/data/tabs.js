import {
  faEye as appearanceIcon,
  faSliders as behaviourIcon,
  faPlug as functionIcon,
  faPlusMinus as advancedIcon,
} from "@fortawesome/free-solid-svg-icons";

const tabs = {
  appearance: { id: "appearance", name: "Appearance", icon: appearanceIcon },
  behaviour: { id: "behaviour", name: "Behaviour", icon: behaviourIcon },
  function: { id: "function", name: "Function", icon: functionIcon },
  advanced: {
    id: "advanced",
    name: "Advanced",
    icon: advancedIcon,
  },
};

export default tabs;
