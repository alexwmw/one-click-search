import clsx from "clsx";
import Markdown from "markdown-to-jsx";
import AccordionSection from "./AccordionSection";
import "./Accordion.less";
import { useState } from "react";

const Accordion = ({ object }) => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className={clsx("accordion", "flex-container", "width-100", "column")}>
      {Object.entries(object).map(([title, text]) => {
        return (
          <AccordionSection
            key={title}
            openItem={openItem}
            setOpenItem={setOpenItem}
            title={title}
          >
            <div className="content-inner">
              <Markdown>{text}</Markdown>
            </div>
          </AccordionSection>
        );
      })}
    </div>
  );
};

export default Accordion;
