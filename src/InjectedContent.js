import { createRoot } from "react-dom/client";
import Popup from "./components/Popup/Popup";

const rootElement = document.createElement("div");
rootElement.classList.add("o-c-s_popup", "container");
document.body.insertAdjacentElement("afterend", rootElement);

const root = createRoot(rootElement);

const InjectedContent = (props) => {
  return <Popup />;
};

root.render(<InjectedContent />);
