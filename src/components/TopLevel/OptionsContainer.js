import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import Number from "../ControlsPage/ControlElements/Number";
import Select from "../ControlsPage/ControlElements/Select";
import Slider from "../ControlsPage/ControlElements/Slider";
import Switch from "../ControlsPage/ControlElements/Switch";
import Grid from "../ControlsPage/ControlsPage_Grid";

function OptionsContainer({ selectedTab, children = null }) {
  const { settings, setSettings } = useContext(SettingsContext);
  console.log(selectedTab);
  console.log(Object.values(settings));

  return (
    <div className={"flex-container page"} id="optionsContainer">
      {children && children}
      {!children && (
        <Grid header={selectedTab.name} colTemplate={"8fr 1fr 6fr 2fr"}>
          {Object.keys(settings)
            .filter((key) => settings[key].class == selectedTab.id)
            .map((id) => {
              switch (settings[id].type) {
                case "switch":
                  return <Switch settingId={id} />;
                case "slider":
                  return <Slider settingId={id} />;
                case "select":
                  return <Select settingId={id} />;
                case "number":
                  return <Number settingId={id} />;
              }
            })}
        </Grid>
      )}
    </div>
  );
}

export default OptionsContainer;
