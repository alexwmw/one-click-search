import { useContext } from "react";
import {
  faPlus as plusIcon,
  faRecycle as restoreIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";

import Grid from "./ControlsPage_Grid";
import Section from "./ControlsPage_Section";
import Button from "./Button";
import Select from "./ControlElements/Select";
import Slider from "./ControlElements/Slider";
import Switch from "./ControlElements/Switch";
import Number from "./ControlElements/Number";

import ProviderForm from "../ProviderForm/ProviderForm";

import SettingsContext from "../../contexts/SettingsContext";
import ProvidersContext from "../../contexts/ProvidersContext";

import OCSproviders from "../../data/providers.json";
import OCSfunctions from "../../data/functions.json";

import { sortByPosition } from "../../modules/Utilities";

const ControlsPage = () => {
  const { settings, setSettings } = useContext(SettingsContext);
  const { providers, setProviders } = useContext(ProvidersContext);
  const RestoreIcon = <FAIcon icon={restoreIcon} />;
  const PlusIcon = <FAIcon icon={plusIcon} />;

  const onRestoreClick = (e) => {
    e.preventDefault();
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      const defaultProviders = sortByPosition([
        ...OCSproviders,
        ...OCSfunctions,
      ]);
      setProviders(defaultProviders);
    }
  };

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
        <Number settingId={settings.maxChars.id} />
        <Switch settingId={settings.animations.id} />
      </Grid>
      <Grid header={"Additional Functions"}>
        <Switch settingId={settings.enableCopy.id} />
        <Switch settingId={settings.enableGoto.id} />
      </Grid>
      <Section header="Manage Providers">
        Add a new provider:<Button icon={PlusIcon}>Add provider</Button>
        Reset providers to defaults:
        <Button icon={RestoreIcon} onClick={onRestoreClick}>
          Restore defaults
        </Button>
        <ProviderForm addNew />
      </Section>
    </div>
  );
};

export default ControlsPage;
