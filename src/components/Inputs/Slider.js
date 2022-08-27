import { useContext, useState } from "react";
import ChromeContext from "../../contexts/ChromeContext";
import "./Slider.less";

const Slider = ({ settingId }) => {
  const { chrome, dispatchChrome } = useContext(ChromeContext);
  const { min, max, step, unit } = chrome.options[settingId];
  const [value, setValue] = useState(chrome.options[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const onRelease = (e) => {
    dispatchChrome({
      type: "UPDATE_SETTING",
      settingId: settingId,
      value: value,
    });
  };

  return (
    <>
      <input
        onMouseUp={(e) => onRelease(e)}
        className={"slider"}
        type="range"
        value={value}
        onChange={changeHandler}
        max={max}
        min={min}
        step={step}
      ></input>
      <span className="indicator">
        {value}
        {step == 0.5 && value % 1 == 0 && ".0"}
        {unit}
      </span>
    </>
  );
};

export default Slider;
