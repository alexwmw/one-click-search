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

  const proceedAndClose = (e) => {
    onProceed(e);
    onClose(e);
  };

  return (
    <div className={clsx("btn-area", "flex-container", "row", align)}>
      {onClose && <Button onClick={onClose}>{closeText}</Button>}
      {onProceed && (
        <Button
          type={"button"}
          onClick={closeOnSubmit ? proceedAndClose : onProceed}
        >
          {proceedText}
        </Button>
      )}
    </div>
  );
}

export default ButtonArea;
