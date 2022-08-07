import Button from "/src/components/Buttons/Button";
import {
  faPlus as addIcon,
  faRecycle as resetIcon,
} from "@fortawesome/free-solid-svg-icons";

import "./ManagementRows.less";
import OptionRows from "./OptionsRows";
import AddProviderModal from "../../components/Modals/AddProviderModal";
import { useState } from "react";

const ManagementRows = ({ selectedTab }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onAddProvClick = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <AddProviderModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <div className="management-rows">
        <OptionRows selectedTab={selectedTab} />
        <div className={`options-rows management`}>
          {/* Reset */}
          <div className={`options-row-container `}>
            <h3>{"Reset to Defaults"}</h3>
            <div className={"options-row"}>
              <p className="row-label">{"Room for a description"}</p>
              <div className="control">
                <Button icon={resetIcon}>Reset to defaults</Button>
              </div>
            </div>
          </div>
          {/* Add new */}
          <div className={`options-row-container `}>
            <h3>{"Add a new provider"}</h3>
            <div className={"options-row"}>
              <p className="row-label">{"Room for a description"}</p>
              <div className="control">
                <Button onClick={onAddProvClick} icon={addIcon}>
                  Add new provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementRows;
