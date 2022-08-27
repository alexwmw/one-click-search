import { useContext, useState, useEffect } from "react";
import useOutsideClick from "/src/hooks/useOutsideClick";
import ChromeContext from "../../contexts/ChromeContext";
import "./Select.less";

const Select = ({ settingId }) => {
  const { chrome, dispatchChrome } = useContext(ChromeContext);
  const { options } = chrome.options[settingId];
  const [value, setValue] = useState(chrome.options[settingId].value);
  const [active, setActive] = useState(false);

  /** Mouse event */
  const ref = useOutsideClick(() => setActive(false));

  const changeHandler = (value) => {
    setActive(false);
    setValue(value);
  };

  useEffect(() => {
    dispatchChrome({
      type: "UPDATE_SETTING",
      settingId: settingId,
      value: value,
    });
  }, [value]);

  return (
    <div className={"pseudo-select"}>
      <ul
        ref={ref}
        onClick={() => setActive((active) => !active)}
        className={`pseudo-select-visible ${active ? "active" : ""}`}
      >
        <li className={"pseudo-option selected"}>
          <span>{value}</span>
        </li>
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
  );
};

export default Select;
