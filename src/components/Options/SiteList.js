import { useContext, useEffect, useState } from "react";
import ChromeContext from "../../contexts/ChromeContext";

const SiteList = ({ settingId }) => {
  const { options, dispatchChrome } = useContext(ChromeContext);
  const [value, setValue] = useState((options[settingId]?.value ?? []).join("\n"));

  useEffect(() => {
    setValue((options[settingId]?.value ?? []).join("\n"));
  }, [options, settingId]);

  const save = () => {
    const sites = [
      ...new Set(
        value
          .split(/[\n,]+/)
          .map((site) => {
            const input = site.trim().toLowerCase().replace(/^\*\./, "");
            if (!input) return "";
            try {
              return new URL(
                input.includes("://") ? input : `https://${input}`
              ).hostname.replace(/^www\./, "");
            } catch (e) {
              return "";
            }
          })
          .filter(Boolean)
      ),
    ];
    setValue(sites.join("\n"));
    dispatchChrome({ type: "UPDATE_SETTING", settingId, value: sites });
  };

  return (
    <textarea
      aria-label="Disabled sites, one domain per line"
      rows={4}
      value={value}
      placeholder="example.com"
      onChange={(event) => setValue(event.target.value)}
      onBlur={save}
    />
  );
};

export default SiteList;
