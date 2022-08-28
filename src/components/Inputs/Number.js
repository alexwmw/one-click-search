import clsx from "clsx";
import { useContext, useState } from "react";
import ChromeContext from "../../contexts/ChromeContext";
import Button from "../Buttons/Button";
import "./Number.less";

const Number = ({ settingId }) => {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const [value, setValue] = useState(options[settingId].value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const onSet = () => {
    dispatchChrome({
      type: "UPDATE_SETTING",
      settingId: settingId,
      value: value,
    });
  };

  return (
    <>
      <input
        type={"number"}
        className={"number"}
        value={value}
        onChange={changeHandler}
      ></input>
      <Button
        classes={value == options[settingId].value && "unchanged"}
        onClick={onSet}
      >
        Set
      </Button>
    </>
  );
};

export default Number;
