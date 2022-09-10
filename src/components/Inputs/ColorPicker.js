import clsx from "clsx";
import { useState, useRef, useEffect, useContext } from "react";
import ChromeContext from "../../contexts/ChromeContext";
import "./ColorPicker.less";

const ColorPicker = ({ settingId }) => {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const { options: colors } = options[settingId];
  const [value, setValue] = useState(options[settingId].value);

  const isMounted = useRef(false);

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
    <div className="color-picker">
      {colors.map((color) => {
        const inputId = `color-picker-${color}`;
        const clickHandler = () => {
          const input = document.getElementById(inputId);
          input.click();
        };
        return (
          <div key={color}>
            <span
              className={clsx("color-square", value === color && "selected")}
              onClick={clickHandler}
            >
              <div
                style={{ backgroundColor: `#${color}` }}
                className="inner-square"
              ></div>
            </span>
            <input
              key={color}
              type="radio"
              className="color-picker-button"
              name={color}
              id={inputId}
              checked={value === color}
              onChange={() => setValue(color)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ColorPicker;
