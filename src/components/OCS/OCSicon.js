import OCSFunctionIcon from "./OCSFunctionIcon";
import OCSProviderIcon from "./OCSProviderIcon";

function OCSIcon({ provider, text, onIconClick, linkTarget }) {
  /** Do not render if regex criteria are not met */
  if (provider.regex && !RegExp(provider.regex).test(text)) {
    return null;
  }
  return (
    <>
      {provider.role == "provider" && (
        <OCSProviderIcon
          provider={provider}
          text={text}
          onIconClick={onIconClick}
          linkTarget={linkTarget}
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
