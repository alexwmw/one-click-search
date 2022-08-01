import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useSetSettingsEffect from "../../../hooks/useSetSettingsEffect";
import "./Number.less";

const Number = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  /** Mouse event */
  const ref = useOutsideClick(() => setActive(false));

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label>{label}</label>
      {icon}

      <input
        type={"number"}
        className={"number"}
        value={value}
        onChange={changeHandler}
      ></input>

      <span></span>
    </>
  );
};

export default Number;
