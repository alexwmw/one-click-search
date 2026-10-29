import clsx from "clsx";
import { useState } from "react";
import Button from "../Buttons/Button";
import AddProviderModal from "../Modals/AddProviderModal";
import HelpIcon from "../Tooltips/HelpIcon";
import "./OptionsTitleArea.less";

const OptionsTitleArea = ({ selectedTab, isSearch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onAddProvClick = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <AddProviderModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />

      <div
        className={clsx(
          "flex-container",
          "row",
          "center",
          "options-title-area"
        )}
      >
        <h2>{selectedTab.nameLong ?? selectedTab.name} </h2>
        {isSearch && (
          <>
            <HelpIcon />
            <Button icon={"add"} onClick={onAddProvClick}>
              Add new provider
            </Button>
          </>
        )}
      </div>
    </>
  );
};
export default OptionsTitleArea;
