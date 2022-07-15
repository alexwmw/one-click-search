import { useContext } from "react";
import SettingsContext from "../../../contexts/SettingsContext";

const Select = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label, value, options } = settings[settingId];

  const changeHandler = () => {};

  return (
    <>
      <label>
        {label}
        {icon}
      </label>
      <select value={value} onChange={changeHandler}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div></div>
    </>
  );
};

export default Select;
