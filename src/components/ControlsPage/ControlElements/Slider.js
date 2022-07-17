import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import "./Slider.less";

const Slider = ({ settingId, icon, overrides = {} }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label, min, max, step } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(
    () =>
      setSettings((allSettings) => {
        allSettings[settingId].value = value;
        return { ...allSettings };
      }),
    [value]
  );

  return (
    <>
      <label>{label}</label>
      {icon}
      <input
        className={"slider"}
        type="range"
        value={value}
        onChange={changeHandler}
        max={overrides.max || max}
        min={overrides.min || min}
        step={overrides.step || step}
      ></input>
      <span className={"indicator"}>
        {overrides.values
          ? overrides.values[value]
          : value + settings[settingId].unit}
      </span>
    </>
  );
};

export default Slider;
