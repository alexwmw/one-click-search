import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./less/basic-formatting.less";
import "./less/mixins.less";
import OCScontrols from "./data/options.json";
import OCSproviders from "./data/providers.json";
import OCSfunctions from "./data/functions.json";
import { FlexContainer } from "./components/basic-components/BasicStyledComponents";
import TabRow from "./components/TabRow";
//import Content from "./components/Content";

const Content = lazy(() => import("./components/Content"));

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

const App = () => {
  chrome.storage.sync.clear();

  // const OptionsContext = React.createContext(OCScontrols);

  // const [providers, setProviders] = useState(OCSproviders);

  // const storageDefaults = {
  //   providers: providers,
  // };

  const OSCiconsList = [...OCSproviders, ...OCSfunctions];
  console.log("OSCiconsList:", OSCiconsList);

  const iconSectionsData = [
    {
      name: "Visible",
      id: "visible",
      max: 4,
      items: OSCiconsList.filter(
        (provider) => provider.visibility == "visible"
      ),
    },
    {
      name: "Hidden",
      id: "hidden",
      items: OSCiconsList.filter((provider) => provider.visibility == "hidden"),
    },
    {
      name: "Disabled",
      id: "disabled",
      items: OSCiconsList.filter(
        (provider) => provider.visibility == "disabled"
      ),
    },
  ];

  // Tabs
  const tabNames = { icons: "Icon Order", controls: "Controls" };
  const [selectedTab, setSelectedTab] = useState(tabNames.icons);
  const tabSelectHandler = (tabName) => {
    setSelectedTab(tabName);
    console.log("tab selection made");
  };

  return (
    <FlexContainer width={"300px"} direction={"column"}>
      <TabRow
        tabNames={tabNames}
        selectedTab={selectedTab}
        onTabSelect={tabSelectHandler}
      />
      <Content
        iconSectionsData={iconSectionsData}
        tabNames={tabNames}
        selectedTab={selectedTab}
      />
    </FlexContainer>
  );
};

root.render(<App />);
