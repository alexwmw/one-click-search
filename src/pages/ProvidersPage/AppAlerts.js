import Alert from "../../components/Modals/Alert";
import Confirm from "../../components/Modals/Confirm";

function AppAlerts(props) {
  return (
    <div className="alerts-container">
      <Confirm
        {...props.confirmData}
        hasTitleBar={true}
        openAsModal={true}
        onClose={() => props.setConfirmData({ isOpen: false })}
      />
      <Alert
        {...props.alertData}
        hasTitleBar={true}
        onClose={() => props.setAlertData({ isOpen: false })}
        isModal={true}
        classes={"error-alert"}
        openAsModal={true}
      />
    </div>
  );
}

export default AppAlerts;
