import { useContext, useState, useEffect } from "react";
import ChromeContext from "../../contexts/ChromeContext";
import "./Switch.less";

const Switch = ({ settingId }) => {
  const { chrome, dispatchChrome } = useContext(ChromeContext);
  const [value, setValue] = useState(chrome.options[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.checked);
  };

  useEffect(() => {
    dispatchChrome({
      type: "UPDATE_SETTING",
      settingId: settingId,
      value: value,
    });
  }, [value]);

  return (
    <>
      <label className="switch">
        <input type={"checkbox"} checked={value} onChange={changeHandler} />
        <span className="handle" />
      </label>
      <span className={`indicator${value ? " on" : " off"}`}>
        {value ? "ON" : "OFF"}
      </span>
    </>
  );
};

export default Switch;
