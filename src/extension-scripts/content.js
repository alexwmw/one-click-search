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
   *  aync get data from chrome ( (chromeData) => {
   *      add mouseup event listener ( (eventData) =>
   *          setState({chromeData, eventData})
   *      )})
   */
  useEffect(() => {
    chrome.storage.sync.get({}, (result) => {
      const providers = [...OCSproviders, ...OCSfunctions];

      document.addEventListener("mouseup", (evt) => {
        const text = window.getSelection().toString();
        const OCS = evt.target.classList.contains("OCS");

        if (!OCS) {
          setState({ text: text, x: evt.pageX, y: evt.pageY, providers });
        }
      });
    });
  }, []);

  return (
    <div>
      {state.text && (
        <div
          className="OneClickSearch OCS"
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
