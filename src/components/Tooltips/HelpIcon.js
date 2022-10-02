import { useState } from "react";
import IconTrigger from "../Icons/IconTrigger";
import HelpModal from "../Modals/HelpModal";
import "./HelpIcon.less";

const HelpIcon = ({ notOpts }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <HelpModal
        notOpts={notOpts}
        show={showHelp}
        close={() => setShowHelp(false)}
      />
      <IconTrigger onClick={() => setShowHelp(true)} type={"help"} />
    </>
  );
};

export default HelpIcon;
