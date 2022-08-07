import { useContext, useState } from "react";
import SettingsContext from "../../../contexts/SettingsContext";
import useSetSettingsEffect from "../../../hooks/useSetSettingsEffect";
import "./Number.less";

const Number = ({ settingId }) => {
  const { settings } = useContext(SettingsContext);
  const [value, setValue] = useState(settings[settingId].value);

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type={"number"}
      className={"number"}
      value={value}
      onChange={changeHandler}
    ></input>
  );
};

export default Number;
