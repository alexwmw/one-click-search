import { FlexContainer } from "../basic-components/BasicStyledComponents";
import IconsPage_Section from "./IconsPage_Section";
import "../../less/iconsPage.less";

const IconsPage = (props) => {
  return (
    <FlexContainer id={"iconsPage"} direction={"column"}>
      {props.data.map((section) => {
        return (
          <IconsPage_Section
            key={section.id}
            items={section.items}
            sectionName={section.name}
            listId={section.id}
            max={section.max}
          ></IconsPage_Section>
        );
      })}
    </FlexContainer>
  );
};

export default IconsPage;
