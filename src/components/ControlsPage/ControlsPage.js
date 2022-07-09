import ControlsPage_Grid from "./ControlsPage_Grid";
import {
  ControlsPage_ResetButton,
  ControlsPage_AddButton,
} from "./ControlsPage_Buttons";
import ControlsPage_Modal from "./ControlsPage_Modal";

const ControlsPage = () => {
  return (
    <div className={"flex-container page"}>
      <ControlsPage_Grid /> 
      <ControlsPage_ResetButton />
      <ControlsPage_AddButton />
      <ControlsPage_Modal />
    </div>
  );
};

export default ControlsPage;
