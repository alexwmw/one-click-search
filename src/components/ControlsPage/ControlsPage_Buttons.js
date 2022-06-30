const ControlsPage_ResetButton = (props) => {
  return (
    <span>
      <i className="fas fa-trash-restore-alt"></i>
      Reset search providers to default values
    </span>
  );
};

const ControlsPage_AddButton = (props) => {
  return (
    <span>
      <i className="fas fa-plus-circle"></i>
      Add a new search provider
    </span>
  );
};

export { ControlsPage_ResetButton, ControlsPage_AddButton };
