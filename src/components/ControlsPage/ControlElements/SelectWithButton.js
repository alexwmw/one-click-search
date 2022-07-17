import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import "./Select.less";

const SelectWithButton = ({ settingId, icon }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label, value, options } = settings[settingId];
  const [thisValue, setThisValue] = useState(value);
  const [active, setActive] = useState(false);

  const changeHandler = () => {};

  return (
    <>
      <label>{label}</label>
      {icon}

      <div className={"pseudo-select"} onChange={changeHandler}>
        <ul
          onClick={() => setActive((active) => !active)}
          className={`pseudo-select-visible ${active ? "active" : ""}`}
          onChange={changeHandler}
        >
          <li className={"pseudo-option selected"}>{thisValue}</li>
        </ul>
        <ul className={`pseudo-select-hidden ${active ? "active" : ""}`}>
          {options.map((opt) => (
            <li
              onClick={() => {
                setThisValue(opt);
                setActive(false);
              }}
              className={"pseudo-option"}
              key={opt}
              value={opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>

      <select
        className={"real-select"}
        value={thisValue}
        onChange={changeHandler}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div>{thisValue == "Custom" && <button>Choose</button>}</div>
    </>
  );
};

export default SelectWithButton;
