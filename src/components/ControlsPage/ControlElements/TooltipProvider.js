import { cloneElement, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInfo as infoIcon } from "@fortawesome/free-solid-svg-icons";
import SettingsContext from "../../../contexts/SettingsContext";
import "./TooltipProvider.less";
import Tooltip from "./Tooltip";

/**
 * Returns the child elements with an icon prop which points to
 * a help icon, which revelas the childs description when clicked
 */
const TooltipProvider = ({ children }) => {
  const { settings, setSettings } = useContext(SettingsContext);

  const setTooltipVisible = (id, value) => {
    setSettings((allSettings) => {
      allSettings[id].tooltipIsVisible = value;
      return { ...allSettings };
    });
  };

  const clearTooltips = () =>
    Object.values(settings).forEach((setting) =>
      setTooltipVisible(setting.id, false)
    );

  useEffect(() => {
    return clearTooltips;
  }, []);

  useEffect(() => {
    clearTooltips();
  }, []);

  const iconisedChildren = children.map((child) => {
    const id = child.props.settingId;
    const isVisible = settings[id].tooltipIsVisible || false;

    return cloneElement(child, {
      key: child.props.settingId,
      icon: (
        <div
          className="iconContainer"
          onMouseOver={() => setTooltipVisible(id, true)}
          onMouseOut={() => setTooltipVisible(id, false)}
        >
          <span>i</span>
          <Tooltip
            isVisible={isVisible}
            description={settings[id].description}
          />
        </div>
      ),
    });
  });

  return <>{iconisedChildren}</>;
};

export default TooltipProvider;
