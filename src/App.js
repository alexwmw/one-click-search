import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ProvidersSorter from "./components/ProvidersSorter/ProvidersSorter";
import Header from "./components/Headers/Header";
import IconAnchor from "./components/Icons/IconAnchor";
import HelpIcon from "./components/Tooltips/HelpIcon";
import { applyTheme, get } from "./modules/Utilities";
import {
  hostnameFromUrl,
  isHostnameExcluded,
  updateExcludedSites,
} from "./modules/SiteExclusions.mjs";
import "./App.less";
import "./less/flex.less";
import "./less/theme.less";
import "./components/Inputs/Switch.less";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const CurrentSiteToggle = ({ hostname, options, onChange }) => {
  const available = Boolean(hostname && options);
  const enabled = available
    ? !isHostnameExcluded(hostname, options.excludedSites?.value ?? [])
    : false;

  return (
    <section className="current-site-toggle" aria-live="polite">
      {available ? (
        <>
          <div>
            <h2>One Click Search on {hostname}</h2>
            <p>{enabled ? "Enabled" : "Disabled"}</p>
          </div>
          <label className="switch" aria-label={`One Click Search on ${hostname}`}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => onChange(event.target.checked)}
            />
            <span className="handle" />
          </label>
        </>
      ) : (
        <p className="current-site-unavailable">
          This page cannot be added to Disabled sites.
        </p>
      )}
    </section>
  );
};

/** Define App */
const App = () => {
  const [options, setOptions] = useState(null);
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    get(["options"], ({ options: storedOptions }) => {
      setOptions(storedOptions);
      applyTheme(storedOptions?.theme?.value?.toLowerCase());
    });

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      setHostname(hostnameFromUrl(tab?.url));
    });
  }, []);

  const updateCurrentSite = (shouldEnable) => {
    if (!options || !hostname) return;

    const excludedSites = updateExcludedSites(
      options.excludedSites?.value ?? [],
      hostname,
      !shouldEnable
    );
    const nextOptions = {
      ...options,
      excludedSites: { ...options.excludedSites, value: excludedSites },
    };
    setOptions(nextOptions);
    chrome.storage.sync.set({ options: nextOptions });
  };

  return (
    <div className={clsx("app", "flex-container", "column")}>
      <Header>
        <div className={clsx("icons-group", "flex-container", "row", "center")}>
          <IconAnchor href={"options.html"} newTab type={"options"} />
        </div>
      </Header>
      <CurrentSiteToggle
        hostname={hostname}
        options={options}
        onChange={updateCurrentSite}
      />
      <ProvidersSorter>
        <div
          style={{ marginBottom: "0.83em" }}
          className="flex-container row center space-between"
        >
          <h2
            style={{ margin: "0" }}
            className="flex-container row center space-between"
          >
            Manage search engines
          </h2>
          <HelpIcon notOpts={true} />
        </div>
      </ProvidersSorter>
    </div>
  );
};

//** Render App */
root.render(<App />);
