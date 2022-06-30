import IconsFunctionLI from "./IconsFunctionLI";
import IconsProviderLI from "./IconsProviderLI";
import "../../../less/iconsPage_ListItem.less";

function IconsLI(props) {
  if (props.role == "provider")
    return <IconsProviderLI {...props}></IconsProviderLI>;
  if (props.role == "function")
    return <IconsFunctionLI {...props}></IconsFunctionLI>;
}

export default IconsLI;
