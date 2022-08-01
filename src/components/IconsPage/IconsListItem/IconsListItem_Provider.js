import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faMinus as closeIcon,
} from "@fortawesome/free-solid-svg-icons";
import ProvidersContext from "../../../contexts/ProvidersContext";
import ProviderForm from "../../ProviderForm/ProviderForm";
// import ProviderForm from "./IconsListItem_Provider_Form";

function IconsListItem_Provider({
  sortIcon,
  name,
  key,
  id,
  openItem,
  setOpenItem,
}) {
  /** State and local data */
  const { providers } = useContext(ProvidersContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const faviconUrl = () => {
    const provider = providers.filter((p) => p.name == name)[0];
    return provider.faviconUrl || `https://${provider.hostname}/favicon.ico`;
  };

  const toggleExpanded = () => {
    if (isUnsaved && confirm("Unsaved changes will be lost")) {
      setIsExpanded(false);
      setIsUnsaved(false);
    } else {
      setIsExpanded((expanded) => !expanded);
    }
  };

  useEffect(() => {
    if (openItem !== name) {
      setIsExpanded(false);
    }
  }, [openItem]);

  const ExpandButton = (
    <button onClick={toggleExpanded}>
      <Icon className={"fa-icon"} icon={!isExpanded ? editIcon : closeIcon} />
    </button>
  );

  return (
    <li
      key={key}
      data-id={name}
      className={`sortableItem ${isExpanded ? "expanded" : ""}`}
      onClick={(e) => setOpenItem(name)}
      onDragStart={(e) => setOpenItem(null)}
    >
      {sortIcon}
      <img src={faviconUrl()}></img>
      <span>{name}</span>
      {ExpandButton}
      {isExpanded && (
        <ProviderForm
          nameRef={name}
          closeForm={() => setIsExpanded(false)}
          // setIsExpanded={setIsExpanded}
        ></ProviderForm>
      )}
    </li>
  );
}

export default IconsListItem_Provider;
