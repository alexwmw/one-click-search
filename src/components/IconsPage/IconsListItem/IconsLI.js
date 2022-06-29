import IconsFunctionLI from "./IconsFunctionLI";
import IconsProviderLI from "./IconsProviderLI";

function IconsLI(props) {
  console.log(props.role);
  if (props.role == "provider") {
    return <IconsProviderLI {...props}></IconsProviderLI>;
  }

  if (props.role == "function") {
    return <IconsFunctionLI {...props}></IconsFunctionLI>;
  }
}

export default IconsLI;
