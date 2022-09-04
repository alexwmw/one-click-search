import { useEffect } from "react";
import { useState } from "react";
import Alert from "../../components/Modals/Alert";
import Confirm from "../../components/Modals/Confirm";

const AppAlerts = () => {
  const [confirmData, setConfirmData] = useState({ isOpen: false });
  const [alertData, setAlertData] = useState({ isOpen: false });
  let key = 0;

  const alertHandler = {
    error: ({ title, messages }) => {
      setAlertData({
        isOpen: true,
        title: title,
        children: messages.map((p) => <p key={key++}>{p}</p>),
      });
    },
    confirm: ({ title, question, onProceed }) => {
      setConfirmData({
        isOpen: true,
        title: title,
        body: question,
        onProceed: () => {
          onProceed();
          setConfirmData({ isOpen: false });
        },
      });
    },
  };

  const AlertProvider = (props) => {
    return (
      <div className="alerts-container">
        <Confirm
          {...confirmData}
          hasTitleBar={true}
          openAsModal={true}
          onClose={() => setConfirmData({ isOpen: false })}
        />
        <Alert
          {...alertData}
          hasTitleBar={true}
          onClose={() => setAlertData({ isOpen: false })}
          isModal={true}
          classes={"error-alert"}
          openAsModal={true}
        />
      </div>
    );
  };

  return { alertHandler, AlertProvider };
};

export default AppAlerts;
