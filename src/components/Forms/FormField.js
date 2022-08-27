const FormField = (props) => {
  const {
    value,
    setValue,
    label,
    placeholder,
    formatField,
    classes = [],
    required,
  } = props;

  return (
    <div className="flex-container row form-row center">
      <label>{label}</label>
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
    </div>
  );
};

export default FormField;
