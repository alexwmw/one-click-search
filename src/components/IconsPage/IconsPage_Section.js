import { FlexChild } from "../basic-components/BasicStyledComponents";
import IconsLI from "./IconsListItem/IconsLI";

function IconsPage_Section(props) {
  const maxStr = props.max ? `(max. ${props.max})` : "";

  const itemList = props.items.map((item) => (
    <IconsLI
      iconClasses={props.iconClasses}
      role={item.role}
      key={item.name}
      name={item.name}
      url={item.url}
      faviconUrl={item.faviconUrl}
      queryKey={item.queryKey}
    />
  ));

  return (
    <FlexChild width="100%">
      <h2>{`${props.sectionName} ${maxStr}`}</h2>
      <ul id={props.listId}>{itemList}</ul>
    </FlexChild>
  );
}

export default IconsPage_Section;
