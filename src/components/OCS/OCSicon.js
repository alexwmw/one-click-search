import OCSFunctionIcon from "./OCSFunctionIcon";
import OCSProviderIcon from "./OCSProviderIcon";

function OCSIcon({ provider, text, onIconClick }) {
  // Replace with props options or context options
  const options = { blankTarget: true };

  /** Do not render if regex criteria are not met */
  if (provider.regex && !RegExp(provider.regex).test(text)) {
    return null;
  }
  return (
    <>
      {provider.role == "provider" && (
        <OCSProviderIcon
          options={options}
          provider={provider}
          text={text}
          onIconClick={onIconClick}
        />
      )}
      {provider.role == "function" && (
        <OCSFunctionIcon
          provider={provider}
          text={text}
          onIconClick={onIconClick}
        />
      )}
    </>
  );
}
export default OCSIcon;
