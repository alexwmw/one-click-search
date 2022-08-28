import { useContext, useState, useEffect, useRef } from "react";
import useOutsideClick from "/src/hooks/useOutsideClick";
import ChromeContext from "../../contexts/ChromeContext";
import "./Select.less";

const Select = ({ settingId }) => {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const { options: opts } = options[settingId];
  const [value, setValue] = useState(options[settingId].value);
  const [active, setActive] = useState(false);
  const isMounted = useRef(false);

  /** Mouse event */
  const ref = useOutsideClick(() => setActive(false));

  const changeHandler = (value) => {
    setActive(false);
    setValue(value);
  };

  useEffect(() => {
    if (isMounted.current) {
      dispatchChrome({
        type: "UPDATE_SETTING",
        settingId: settingId,
        value: value,
      });
    } else {
      isMounted.current = true;
    }
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
        {opts.map((opt) => (
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
