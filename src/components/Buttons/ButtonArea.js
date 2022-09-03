import clsx from "clsx";
import Button from "./Button";

function ButtonArea(props) {
  const {
    onProceed,
    onClose,
    proceedText = "OK",
    closeText = "Cancel",
    align = "right",
    closeOnSubmit = true,
  } = props;

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <div className={clsx("btn-area", "flex-container", "row", align)}>
      {onClose && <Button onClick={onClose}>{closeText}</Button>}
      {onProceed && (
        <Button onClick={closeOnSubmit ? proceedAndClose : onProceed}>
          {proceedText}
        </Button>
      )}
    </div>
  );
}

export default ButtonArea;
