import { useContext, useState } from "react";
import SettingsContext from "/src/contexts/SettingsContext";
import useSetSettingsEffect from "/src/hooks/useSetSettingsEffect";
import "./Switch.less";
import { ToastsContext } from "../../reducers/ToastsReducer";

const Switch = ({ settingId }) => {
  const { settings } = useContext(SettingsContext);
  const { dispatchToasts } = useContext(ToastsContext);

  const [value, setValue] = useState(settings[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.checked);
    dispatchToasts({ type: "DEFAULT" });
  };

  /** Update settings on value change */
  useSetSettingsEffect(settingId, value);

  return (
    <label className="switch">
      <input type={"checkbox"} checked={value} onChange={changeHandler} />
      <span className="handle" />
    </label>
  );
};

export default Switch;
