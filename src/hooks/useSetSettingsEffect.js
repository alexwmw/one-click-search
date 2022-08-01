import { useContext, useEffect } from "react";
import SettingsContext from "../contexts/SettingsContext";

function useSetSettingsEffect(settingId, valueState) {
  const { settings, setSettings } = useContext(SettingsContext);

  useEffect(
    () =>
      setSettings((allSettings) => {
        allSettings[settingId].value = valueState;
        return { ...allSettings };
      }),
    [valueState]
  );

}

export default useSetSettingsEffect;
