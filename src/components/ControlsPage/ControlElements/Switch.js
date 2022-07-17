import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import "./Switch.less";

const Switch = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.checked);
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
      <label className="switch">
        <input type={"checkbox"} checked={value} onChange={changeHandler} />
        <span className="handle" />
      </label>
      <span>{value}</span>
    </>
  );
};

export default Switch;
