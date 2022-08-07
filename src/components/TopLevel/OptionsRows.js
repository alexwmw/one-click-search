import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import Number from "../ControlsPage/ControlElements/Number";
import Select from "../ControlsPage/ControlElements/Select";
import Slider from "../ControlsPage/ControlElements/Slider";
import Switch from "../ControlsPage/ControlElements/Switch";

import "./OptionsRows.less";

const OptionRows = ({ selectedTab }) => {
  const { settings } = useContext(SettingsContext);

  const settingClassToDisplay = selectedTab.id;

  const settingsToDisplay = Object.values(settings)
    .filter((setting) => setting.class == settingClassToDisplay)
    .sort((a, b) => {
      return a.pos - b.pos;
    });

  const getControlOfType = (type, id) => {
    console.log(id);
    switch (type) {
      case "switch":
        return <Switch settingId={id} />;
      case "slider":
        return <Slider settingId={id} />;
      case "select":
        return <Select settingId={id} />;
      case "number":
        return <Number settingId={id} />;
      default:
        () => console.error("no match");
        return;
    }
  };

  const indicator = (type, value, unit) => {
    switch (type) {
      case "switch":
        return (
          <span className={`indicator${value ? " on" : " off"}`}>
            {value ? "ON" : "OFF"}
          </span>
        );
      case "slider":
        return (
          <span className="indicator">
            {value}
            {unit}
          </span>
        );
      case "select":
        return <></>;
      case "number":
        return <></>;
      default:
        () => console.error("no match");
        return;
    }
  };

  return (
    <div className={`options-rows ${settingClassToDisplay}`}>
      {settingsToDisplay.map((setting) => {
        console.log("pos :" + setting.pos);
        const { id, type, description, label, value, unit } = setting;

        const ControlElement = getControlOfType(type, id);

        return (
          <div key={id} className={`options-row-container ${type}-row`}>
            <h3>{label}</h3>
            <div className={"options-row"}>
              <p className="row-label">{description}</p>
              <div className="control">{ControlElement}</div>
              {indicator(type, value, unit)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionRows;
