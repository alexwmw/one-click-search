import { useState, useEffect, useContext } from "react";
import {
  faPlus as addIcon,
  faRecycle as resetIcon,
} from "@fortawesome/free-solid-svg-icons";

import OptionRows from "./OptionsRows";
import Button from "../../components/Buttons/Button";
import Confirm from "../../components/Modals/Confirm";
import AddProviderModal from "../../components/Modals/AddProviderModal";
import ChromeContext from "../../contexts/ChromeContext";
import { ToastsContext } from "../../reducers/ToastsReducer";
import "./OptionsRows.less";

const ManagementRows = ({ selectedTab }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const { dispatchChrome } = useContext(ChromeContext);
  const { dispatchToasts } = useContext(ToastsContext);

  const onAddProvClick = () => {
    setModalIsOpen(true);
  };

  const onResetClick = () => {
    setConfirmIsOpen(true);
  };

  useEffect(() => {
    if (confirmReset) {
      dispatchChrome({ type: "RESET_PROVIDERS" });
      dispatchToasts({ type: "PROVIDERS_RESET" });
      setConfirmReset(false);
    }
  }, [confirmReset]);

  return (
    <>
      <AddProviderModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <Confirm
        isOpen={confirmIsOpen}
        title={"Are you sure?"}
        body={"Are you sure?"}
        onClose={() => setConfirmIsOpen(false)}
        onProceed={() => setConfirmReset(true)}
        hasTitleBar={true}
      />
      <div className="management-rows">
        <OptionRows selectedTab={selectedTab} />
        <div className={`options-rows management`}>
          {/* Reset */}
          <div className={`options-row-container `}>
            <h3>{"Reset to defaults"}</h3>
            <div className={"options-row"}>
              <p className="row-label">
                {
                  "Reset the search providers to their default values. Any search providers you have added wil be lost."
                }
              </p>
              <div className="control">
                <Button onClick={onResetClick} icon={resetIcon}>
                  Reset to defaults
                </Button>
              </div>
            </div>
          </div>
          {/* Add new */}
          <div className={`options-row-container `}>
            <h3>{"Add a new provider"}</h3>
            <div className={"options-row"}>
              <p className="row-label">
                {"Add a new search provider to the pop-up."}
              </p>
              <div className="control">
                <Button onClick={onAddProvClick} icon={addIcon}>
                  Add new provider...
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
