import { useContext, useEffect, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useOutsideClick from "../../../hooks/useOutsideClick";
import "./Select.less";

const Select = ({ settingId, icon, condition, children }) => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { label, options } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);
  const [active, setActive] = useState(false);

  /** Mouse event */
  const ref = useOutsideClick(() => setActive(false));

  /** Update settings on value change */
  useEffect(
    () =>
      setSettings((allSettings) => {
        allSettings[settingId].value = value;
        return { ...allSettings };
      }),
    [value]
  );

  const changeHandler = (value) => {
    setActive(false);
    setValue(value);
  };

  return (
    <>
      <label>{label}</label>
      {icon}

      <div className={"pseudo-select"}>
        <ul
          ref={ref}
          onClick={() => setActive((active) => !active)}
          className={`pseudo-select-visible ${active ? "active" : ""}`}
        >
          <li className={"pseudo-option selected"}><span>{value}</span></li>
        </ul>
        <ul className={`pseudo-select-hidden ${active ? "active" : ""}`}>
          {options.map((opt) => (
            <li
              onClick={() => {
                changeHandler(opt);
              }}
              className={"pseudo-option"}
              key={opt}
              value={opt}
            >
              <span>{opt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>{condition == value && children}</div>
    </>
  );
};

export default Select;
