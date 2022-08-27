import { useContext, useState, useEffect } from "react";
import "./Number.less";
import ChromeContext from "../../contexts/ChromeContext";
import useOutsideClick from "../../hooks/useOutsideClick";

const Number = ({ settingId }) => {
  const { chrome, dispatchChrome } = useContext(ChromeContext);
  const [value, setValue] = useState(chrome.options[settingId].value);
  const [click, setClick] = useState(0);

  /** Mouse event */
  const ref = useOutsideClick(() => {
    setClick((click) => !click);
  });

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatchChrome({
      type: "UPDATE_SETTING",
      settingId: settingId,
      value: value,
    });
  }, [click]);

  return (
    <input
      ref={ref}
      type={"number"}
      className={"number"}
      value={value}
      onChange={changeHandler}
    ></input>
  );
};

export default Number;

