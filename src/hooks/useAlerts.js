import { useState } from "react";
import Alert from "../components/Modals/Alert";
import Confirm from "../components/Modals/Confirm";

const useAlerts = () => {
  const [confirmData, setConfirmData] = useState({ isOpen: false });
  const [alertData, setAlertData] = useState({ isOpen: false });

  let key = 0;

  const alertHandler = {
    invalidProviderError: ({ messages, onClick }) => {
      setAlertData({
        isOpen: true,
        title: "Invalid Form Data",
        children: (
          <>
            <p>Please address the following errors:</p>
            <ul>
              {messages.map((p) => (
                <li key={key++}>{p}</li>
              ))}
            </ul>
          </>
        ),
        callback: onClick,
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

export default useAlerts;
