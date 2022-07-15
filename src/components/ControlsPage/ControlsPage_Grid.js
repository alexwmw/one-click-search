import { useContext } from "react";
import Select from "./ControlElements/Select";
import Slider from "./ControlElements/Slider";
import Switch from "./ControlElements/Switch";
import SettingsContext from "../../contexts/SettingsContext";
import TooltipProvider from "./ControlElements/TooltipProvider";
const ControlsPage_Grid = (props) => {
  const { settings, setSettings } = useContext(SettingsContext);

  return (
    <div
      id="ControlsGrid"
      style={{
        display: "grid",
        gridTemplateColumns: "4.5fr 5fr 1fr",
        gap: "30px 12px",
        alignItems: "center",
      }}
    >
      <TooltipProvider>
        <Slider
          settingId={settings.size.id}
          overrides={{ min: 1, max: 3, step: 1 }}
        />
        <Slider settingId={settings.fadeOutTime.id} />
        <Slider settingId={settings.fadeDelay.id} />
        <Slider settingId={settings.showDelay.id} />
        <Select settingId={settings.linkTarget.id} />
        <Select settingId={settings.colour.id} />
        <Switch settingId={settings.enableCopy.id} />
        <Switch settingId={settings.enableGoto.id} />
        <Switch settingId={settings.animations.id} />
      </TooltipProvider>
    </div>
  );
};

export default ControlsPage_Grid;
