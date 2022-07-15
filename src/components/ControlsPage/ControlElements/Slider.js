import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import "./Slider.less";

const Slider = ({ settingId, icon, overrides = {} }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setSettings((allSettings) => {
      allSettings[settingId].value = value;
      console.log(allSettings);
      return { ...allSettings };
    });
  }, [value]);

  return (
    <>
      <label>
        {label}
        {icon}
      </label>
      <input
        className={"slider"}
        type="range"
        value={value}
        onChange={changeHandler}
        max={overrides.max || 10}
        min={overrides.min || 0}
        step={overrides.step || 0.5}
      ></input>
      <span>{value}</span>
    </>
  );
};

export default Slider;
