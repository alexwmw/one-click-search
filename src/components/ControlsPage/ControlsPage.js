import { useContext } from "react";
import {
  faPlus as plusIcon,
  faRecycle as restoreIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";

import Grid from "./ControlsPage_Grid";
import Select from "./ControlElements/Select";
import Slider from "./ControlElements/Slider";
import Switch from "./ControlElements/Switch";
import SettingsContext from "../../contexts/SettingsContext";
import Section from "./ControlsPage_Section";
import Button from "./Button";

const ControlsPage = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const RestoreIcon = <FAIcon icon={restoreIcon} />;
  const PlusIcon = <FAIcon icon={plusIcon} />;

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
      <Section header="Manage Providers">
        Add a new provider:<Button icon={PlusIcon}>Add provider</Button>
        Reset providers to defaults:{" "}
        <Button icon={RestoreIcon}>Restore defaults</Button>
      </Section>
    </div>
  );
};

export default ControlsPage;
