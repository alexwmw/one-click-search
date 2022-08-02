import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useSetSettingsEffect from "../../../hooks/useSetSettingsEffect";
import "./Switch.less";

const Switch = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.checked);
  };

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  const isOn = value ? "On" : "Off";

  return (
    <>
      <label>{label}</label>
      {icon}
      <label className="switch">
        <input type={"checkbox"} checked={value} onChange={changeHandler} />
        <span className="handle" />
      </label>
      <span className="indicator">{isOn}</span>
    </>
  );
};

export default Switch;
