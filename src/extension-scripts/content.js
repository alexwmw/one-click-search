import { createRoot } from "react-dom/client";
import OneClickSearch from "../components/OCS/OneClickSearch";

/** Define Root */
const rootElement = document.createElement("div");
const root = createRoot(rootElement);
rootElement.classList.add("OneClickSearch--root");

/** Append */
document.body.appendChild(rootElement);

/** Render */
root.render(<OneClickSearch />);
