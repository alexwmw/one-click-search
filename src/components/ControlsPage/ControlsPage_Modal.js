import ControlsPage_NewProviderForm from "./ControlsPage_NewProviderForm";

const ControlsPage_Modal = (props) => {
  return (
    <div
      style={{ display: "none" }}
      className="overlay flex-container column center space-around"
    >
      <div className="modal-outer">
        <div className="modal-inner">
          <ControlsPage_NewProviderForm />
        </div>
      </div>
    </div>
  );
};

export default ControlsPage_Modal;
