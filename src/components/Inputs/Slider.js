import { useContext, useState } from "react";
import ChromeContext from "../../contexts/ChromeContext";
import "./Slider.less";

const Slider = ({ settingId }) => {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const { min, max, step, unit, dictionary } = options[settingId];
  const [value, setValue] = useState(options[settingId].value);

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
      <p className="indicator">
        {dictionary ? dictionary[value] : value}
        {step > 1 && value % 1 == 0 && ".0"}
        {unit}
      </p>
    </>
  );
};

export default Slider;
