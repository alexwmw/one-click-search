import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import Icon from "../Icons/Icon";

const AccordionSection = ({ title, children, openItem, setOpenItem }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setOpenItem(title);
    setExpanded((val) => !val);
  };

  // useEffect(() => {
  //   if (openItem !== title) {
  //     setExpanded(false);
  //   }
  // }, [openItem]);

  return (
    <div
      className={clsx(
        "accordion-section",
        "width-100",
        "flex-container",
        "column"
      )}
    >
      <div
        className={clsx(
          "title-area",
          "flex-container",
          "center",
          "row",
          "space-between"
        )}
        onClick={toggleExpanded}
      >
        <h3>{title}</h3>
        <div className={clsx("flex-container", "center", "justify-center")}>
          {!expanded && <Icon type={"expand"} />}
          {expanded && <Icon type={"collapse"} />}
        </div>
      </div>
      <div className={clsx("content-area", expanded && "expanded")}>
        {children}
      </div>
    </div>
  );
};

export default AccordionSection;
