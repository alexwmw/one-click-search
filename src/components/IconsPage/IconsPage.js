import IconsPage_Instructions from "./IconsPage_Intructions";
import IconsPage_Sortable from "./IconsPage_Sortable";
import "./IconsPage.less";

const IconsPage = ({ listOfProviders }) => {
  const IconsPage_Section_props = [
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

  return (
    <div
      className={`flex-container page`}
      id={"iconsPage"}
      direction={"column"}
    >
      <IconsPage_Instructions />
      {IconsPage_Section_props.map((s) => {
        return <IconsPage_Sortable key={s.id} {...s}></IconsPage_Sortable>;
      })}
    </div>
  );
};

export default IconsPage;
