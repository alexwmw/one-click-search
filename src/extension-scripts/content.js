import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./content.less";

const rootElement = document.createElement("div");
rootElement.classList.add("--shadow--root");
document.body.insertAdjacentElement("afterend", rootElement);

const root = createRoot(rootElement);

const OneClickSearch = (props) => {
  const [searchProviders, setSearchProviders] = useState("unloaded");
  const [isSelection, setIsSelection] = useState(false);

  if (isSelection) {
    const Icons = 1;
  }

  /* useEffect adds event listener on first render */
  useEffect(() => {
    document.addEventListener("mouseup", (evt) => {
      const isString = window.getSelection().toString() !== "";
      setIsSelection(isString);
    });
  }, []);

  return <div>{isSelection && <div className="OCS">{Icons}</div>}</div>;
};

root.render(<OneClickSearch />);
