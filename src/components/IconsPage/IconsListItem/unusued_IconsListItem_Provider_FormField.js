
const IconsListItem_Provider_FormField = ({
  value,
  setValue,
  label,
  id,
  placeholder,
  formatFields,
}) => {
  return (
    <div key={id} className="flex-container row center">
      <label>{label}</label>
      <input
        type={"text"}
        className={"undraggable"}
        onChange={(e) => setValue(e.target.value)}
        onBlur={formatFields}
        onFocus={(e) => e.target.select()}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default IconsListItem_Provider_FormField;
