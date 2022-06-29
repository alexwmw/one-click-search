import IconsPage_Instructions from "./IconsPage_Intructions";
import IconsPage_Section from "./IconsPage_Section";
import "../../less/iconsPage.less";

const IconsPage = ({ listOfProviders }) => {
  const sectionAttributes = [
    {
      name: "Visible",
      id: "visible",
      max: 4,
      providers: listOfProviders.filter(
        (provider) => provider.visibility == "visible"
      ),
    },
    {
      name: "Hidden",
      id: "hidden",
      providers: listOfProviders.filter(
        (provider) => provider.visibility == "hidden"
      ),
    },
    {
      name: "Disabled",
      id: "disabled",
      providers: listOfProviders.filter(
        (provider) => provider.visibility == "disabled"
      ),
    },
  ];

  const Sections = sectionAttributes.map((section) => {
    return (
      <IconsPage_Section
        key={section.id}
        providers={section.providers}
        sectionName={section.name}
        listId={section.id}
        max={section.max}
      ></IconsPage_Section>
    );
  });

  return (
    <div
      className={"flex-container page"}
      id={"iconsPage"}
      direction={"column"}
    >
      <IconsPage_Instructions />
      {Sections}
    </div>
  );
};

export default IconsPage;
