import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./content.less";
import OCSproviders from "../data/providers.json";
import OCSfunctions from "../data/functions.json";
import OCSicon from "../components/OCSicon";

/** Define Root */
const rootElement = document.createElement("div");
rootElement.classList.add("OneClickSearch--root");
document.body.appendChild(rootElement);
const root = createRoot(rootElement);

const OneClickSearch = (props) => {
  const [state, setState] = useState("");

  /** useEffect on first render only:
   *  (async) get data from chrome storage ( (chromeData) => {
   *      add mouseup event listener ( (eventData) =>
   *          setState( {chromeData, eventData} )
   *      )})
   */
  useEffect(() => {
    chrome.storage.sync.get({}, (result) => {
      // Replace with stored data
      const providers = [...OCSproviders, ...OCSfunctions];

      document.addEventListener("mouseup", (evt) => {
        const isOCS = evt.target.closest(".OneClickSearch") !== null;

        if (!isOCS) {
          const text = window.getSelection().toString();
          setState({ text: text, x: evt.pageX, y: evt.pageY, providers });
        }
      });
    });
  }, []);

  return (
    <div>
      {state.text && (
        <div
          className="OneClickSearch"
          style={{
            left: state.x,
            top: state.y,
          }}
        >
          {state.providers.map((provider) => {
            return (
              <OCSicon
                key={provider.name}
                text={state.text}
                provider={provider}
              ></OCSicon>
            );
          })}
        </div>
      )}
    </div>
  );
};

root.render(<OneClickSearch />);
