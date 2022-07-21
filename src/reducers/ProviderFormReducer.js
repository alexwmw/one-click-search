const ProviderFormReducer = (state, action) => {
  const formatHN = (str) =>
    str
      .trim()
      .replace(/^.*:\/\/+/g, "")
      .replace(/\/$/g, "")
      .toLowerCase();

  const formatQP = (str) =>
    str
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase()
      .replace("$text$", "$TEXT$");

  const formatFU = (str) =>
    str
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase();

  switch (action.type) {
    case "SET_HOSTNAME":
      return { ...state, hostname: action.value };
    case "SET_QUERYPATH":
      return { ...state, queryPath: action.value };
    case "SET_FAVICONURL":
      return { ...state, faviconUrl: action.value };
    case "FORMAT_HOSTNAME":
      return { ...state, hostname: formatHN(state.hostname) };
    case "FORMAT_QUERYPATH":
      return { ...state, queryPath: formatQP(state.queryPath) };
    case "FORMAT_FAVICONURL":
      return { ...state, faviconUrl: formatFU(state.faviconUrl) };
  }
};

export default ProviderFormReducer;
