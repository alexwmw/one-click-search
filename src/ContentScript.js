import { createRoot } from "react-dom/client";

const rootElement = document.createElement("div");
rootElement.classList.add("--shadow--root");
document.body.insertAdjacentElement("afterend", rootElement);

const root = createRoot(rootElement);

const OneClickSearch = (props) => {
  return <div>I AM HERE!!!</div>;
};

root.render(<OneClickSearch />);
