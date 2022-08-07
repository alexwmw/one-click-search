import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useSetSettingsEffect from "../../../hooks/useSetSettingsEffect";
import "./Switch.less";

const Switch = ({ settingId }) => {
  const { settings, setSettings } = useContext(SettingsContext);

  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.checked);
  };

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  return (
    <label className="switch">
      <input type={"checkbox"} checked={value} onChange={changeHandler} />
      <span className="handle" />
    </label>
  );
};

export default Switch;
