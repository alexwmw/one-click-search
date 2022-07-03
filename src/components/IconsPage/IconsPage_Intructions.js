import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical as editIcon,
  faChevronUp as hideIcon,
} from "@fortawesome/free-solid-svg-icons";
//import "../../less/iconsPage.less";

function IconsPage_Instructions(props) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden((state) => !state);
  };

  return (
    <div className={`instructions ${isHidden ? "hidden" : "visible"}`}>
      <div
        className="toggleSwitch flex-container row left center"
        onClick={toggleHidden}
      >
        <h2 style={{ marginRight: "10px" }}>How to Use</h2>
        <Icon icon={hideIcon} />
      </div>
      <div className="toggleSection">
        <p>
          Reorder the items below to choose the order that icons appear in the
          popup.
        </p>
        <p>
          Move items to different sections to <strong>hide</strong> the icons
          until mouseover, or to <strong>disable</strong> them entirely.
        </p>
        <p>
          Click the <Icon icon={editIcon} /> <strong>edit icon</strong> to
          change the provider's settings.
        </p>
      </div>
    </div>
  );
}

export default IconsPage_Instructions;
