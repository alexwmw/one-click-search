import TimedAlert from "./TimedAlert";

function SavedAlert(props) {
  return (
    <TimedAlert
      category={"success"}
      title={props.reference ? `${props.reference} was saved!` : "Saved!"}
      isOpen={props.isOpen}
    />
  );
}

export default SavedAlert;
