import { createRoot } from "react-dom/client";
import React from "react";
import clsx from "clsx";
import ProvidersSorter from "./components/ProvidersSorter/ProvidersSorter";
import Header from "./components/Headers/Header";
import IconAnchor from "./components/Icons/IconAnchor";
import HelpIcon from "./components/Tooltips/HelpIcon";
import { get } from "./modules/Utilities";
import "./App.less";
import "./less/flex.less";
import "./less/theme.less";

/** Define root */
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

/** Define App */
const App = () => {
  /** Context States */

  return (
    <div className={clsx("app", "flex-container", "column")}>
      <Header>
        <div className={clsx("icons-group", "flex-container", "row", "center")}>
          <IconAnchor href={"options.html"} newTab type={"options"} />
        </div>
      </Header>
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

//** Get options from storage, set theme and render App  */
get(["options"], ({ options: { theme } }) => {
  const html = document.querySelector("html");
  const mode = theme.value.toLowerCase();
  html.dataset.theme = `theme-${mode}`;
  root.render(<App />);
});
