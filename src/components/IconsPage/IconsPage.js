import Instructions from "./IconsPage_Intructions";
import SortableList from "./IconsPage_Sortable";
import "./IconsPage.less";

import OCSproviders from "../../data/providers.json";
import OCSfunctions from "../../data/functions.json";

const IconsPage = () => {
  const listOfProviders = [...OCSproviders, ...OCSfunctions];

  const Section_props = [
    {
      name: "Visible",
      id: "visible",
      maxLength: 4,
      providerList: listOfProviders.filter(
        (provider) => provider.visibility == "visible"
      ),
    },
    {
      name: "Hidden",
      id: "hidden",
      providerList: listOfProviders.filter(
        (provider) => provider.visibility == "hidden"
      ),
    },
    {
      name: "Disabled",
      id: "disabled",
      providerList: listOfProviders.filter(
        (provider) => provider.visibility == "disabled"
      ),
    },
  ];

  const saveHandler = () => {
    const items = document.getElementsByClassName("sortableItems");
    console.log(items.length);
  };

  const sections = Section_props.map((s) => {
    return <SortableList onSave={saveHandler} key={s.id} {...s}></SortableList>;
  });

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <Instructions />
      {sections}
    </div>
  );
};

export default IconsPage;
