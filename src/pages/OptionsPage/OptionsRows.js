import { useContext } from "react";
import Number from "/src/components/Inputs/Number";
import Select from "/src/components/Inputs/Select";
import Slider from "/src/components/Inputs/Slider";
import Switch from "/src/components/Inputs/Switch";

import "./OptionsRows.less";
import ChromeContext from "../../contexts/ChromeContext";

const OptionRows = ({ selectedTab }) => {
  const { options } = useContext(ChromeContext);

  const settingsToDisplay = Object.values(options)
    .filter((setting) => setting.class == selectedTab.id)
    .sort((a, b) => {
      return a.pos - b.pos;
    });

  const getControlOfType = (type, id) => {
    switch (type) {
      case "switch":
        return (
          <div className="control switch-control">
            <Switch settingId={id} />
          </div>
        );
      case "slider":
        return (
          <div className="control slider-control">
            <Slider settingId={id} />
          </div>
        );
      case "select":
        return (
          <div className="control select-control">
            <Select settingId={id} />
          </div>
        );
      case "number":
        return (
          <div className="control number-control">
            <Number settingId={id} />
          </div>
        );
      default:
        () => console.error("no match");
        return;
    }
  };

  return (
    <div className={`options-rows ${selectedTab.id}`}>
      {settingsToDisplay.map((setting) => {
        const { id, type, description, label, value, unit } = setting;
        const ControlElement = getControlOfType(type, id);

        return (
          <div key={id} className={`options-row-container ${type}-row`}>
            <h3>{label}</h3>
            <div className={"options-row"}>
              <p className="row-label">{description}</p>
              {ControlElement}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionRows;
