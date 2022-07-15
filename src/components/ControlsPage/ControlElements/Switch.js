import { useContext } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import "./Switch.less";

const Switch = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label, value } = settings[settingId];

  const changeHandler = (val) =>
    setSettings((object) => ({
      ...object,
      [settingId]: { ...[settingId], value: val },
    }));

  return (
    <>
      <label>
        {label}
        {icon}
      </label>
      <input
        className="switch"
        type={"checkbox"}
        value={value}
        onChange={changeHandler}
      ></input>
      <span>{value}</span>
    </>
  );
};

export default Switch;
