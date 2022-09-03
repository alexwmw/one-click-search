import { useState, useEffect, useRef, useContext } from "react";
import Button from "./Button";
import ChromeContext from "../../contexts/ChromeContext";
import "./ThemeButton.less";

function ThemeButton({ settingId }) {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const [value, setValue] = useState(options[settingId].value);
  const isMounted = useRef(false);

  const clickHandler = () => {
    if (value === "Light") setValue("Dark");
    else if (value === "Dark") setValue("Light");
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
    <Button
      classes={["theme-button", value.toLowerCase()]}
      icon={value === "Light" ? "lightMode" : "darkMode"}
      onClick={clickHandler}
    >
      {value === "Light" ? "Light mode" : "Dark mode"}
    </Button>
  );
}

export default ThemeButton;
