import ProviderValidator from "./ProviderValidator";
import { visible } from "./Utilities";

/** Private functions *************************************/

const strippedUrl = (url) => url.split(/[\/]/)[2];

const validVisibility = (visibility) => {
  const validator = {
    visible: "visible",
    hidden: "hidden",
    disabled: "disabled",
  };
  return validator[visibility] ?? "disabled";
};

const adaptLegacyProvider = (oldProvider) => {
  const newProvider = {};

  console.log("adaptLegacyProvider OLD: ", oldProvider.name, oldProvider);
  try {
    newProvider.name = oldProvider.name;
    newProvider.role = "provider";
    newProvider.hostname = strippedUrl(oldProvider.url);
    newProvider.queryPath = `${oldProvider.queryKey}$TEXT$`;
    newProvider.faviconUrl = oldProvider.faviconUrl ?? "";
    newProvider.visibility = validVisibility(oldProvider.visibility);
  } catch (err) {
    console.log(
      `adaptLegacyProvider: encountered an error with ${oldProvider.name}`
    );
    console.error(err);
    return null;
  }

  const validator = ProviderValidator(newProvider);

  if (validator.decision) {
    console.log("adaptLegacyProvider NEW: ", newProvider.name, newProvider);
    return newProvider;
  } else {
    console.log(
      "adaptLegacyProvider: validation failed: ",
      newProvider.name,
      validator.messages
    );
    return null;
  }
};

const isNotFunction = (legacyObject) => !legacyObject.isFunc;

/** Public functions **************************************/

export const adaptLegacyObject = (object) => {
  try {
    const returnArray = Object.values(object)
      .sort((a, b) => a.position - b.position)
      .filter(isNotFunction)
      .map(adaptLegacyProvider)
      .filter((p) => p !== null);

    if (returnArray.some((p) => visible(p))) {
      return returnArray;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(`adaptLegacyObject: encountered an error`);
    console.error(err);
    return null;
  }
};

export const isLegacyData = (result) => {
  const providers = Object.values(result.providers);
  const check = providers.some((p) => p.hasOwnProperty("url"));

  console.log(`isLegacyData: ${check ? "WAS" : "was NOT"} legacy data`);

  return check;
};
