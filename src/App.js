import { createRoot } from "react-dom/client";
import React from "react";
import clsx from "clsx";
import ProvidersPage from "./pages/ProvidersPage/ProvidersPage";
import Header from "./pages/OptionsPage/OcsHeader";
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
          {/* <IconTrigger onClick={() => setShowHelp(true)} type={"help"} /> */}
          <IconAnchor href={"options.html"} newTab type={"settings"} />
        </div>
      </Header>
      <ProvidersPage>
        <h2
          style={{ marginTop: "0" }}
          className="flex-container row center space-between"
        >
          Manage search engines
          <HelpIcon />
        </h2>
      </ProvidersPage>
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
