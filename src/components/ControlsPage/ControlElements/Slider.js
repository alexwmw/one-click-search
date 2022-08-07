import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useSetSettingsEffect from "../../../hooks/useSetSettingsEffect";
import "./Slider.less";

const Slider = ({ settingId }) => {
  const { settings } = useContext(SettingsContext);
  const { min, max, step } = settings[settingId];
  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  return (
    <input
      className={"slider"}
      type="range"
      value={value}
      onChange={changeHandler}
      max={max}
      min={min}
      step={step}
    ></input>
  );
};

export default Slider;
