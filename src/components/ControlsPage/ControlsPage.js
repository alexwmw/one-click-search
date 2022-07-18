import { useContext } from "react";
import Grid from "./ControlsPage_Grid";
import Select from "./ControlElements/Select";
import Slider from "./ControlElements/Slider";
import Switch from "./ControlElements/Switch";
import SettingsContext from "../../contexts/SettingsContext";

const ControlsPage = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <div className={"flex-container page"}>
      <Grid header={"Appearance"}>
        <Slider settingId={settings.padding.id} />
        <Slider settingId={settings.borderRadius.id} />
        <Switch settingId={settings.shadow.id} />
        <Select condition="Custom" settingId={settings.colour.id}>
          <button style={{ cursor: "pointer" }} onClick={() => {}}>
            Choose
          </button>
        </Select>
      </Grid>
      <Grid header={"Behaviour"}>
        <Slider settingId={settings.fadeOutTime.id} />
        <Slider settingId={settings.fadeDelay.id} />
        <Slider settingId={settings.showDelay.id} />
        <Select settingId={settings.linkTarget.id} />
        <Switch settingId={settings.animations.id} />
      </Grid>
      <Grid header={"Additional Functions"}>
        <Switch settingId={settings.enableCopy.id} />
        <Switch settingId={settings.enableGoto.id} />
      </Grid>
      <h2 className={"header"}>Manage Providers</h2>
    </div>
  );
};

export default ControlsPage;
