import Tooltip from "../Tooltips/Tooltip";

const FormField = (props) => {
  const {
    value,
    setValue,
    label,
    placeholder,
    formatField,
    classes = [],
    required,
    showTooltip,
    tooltipText,
  } = props;

  return (
    <div className="flex-container row form-row center right">
      <label>{label}</label>
      {showTooltip && <Tooltip text={tooltipText} />}
      <input
        type={"text"}
        className={classes.join(" ")}
        onChange={(e) => setValue(e.target.value)}
        onBlur={formatField}
        onFocus={(e) => e.target.select()}
        value={value}
        placeholder={placeholder}
        required={required}
      />
      {props.children}
    </div>
  );
};

export default FormField;
