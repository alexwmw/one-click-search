const ProviderFormReducer = (state, action) => {
  const formatN = (str) => str.trim();

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
      .replaceAll("$text$", "$TEXT$");

  const formatFU = (str) =>
    str
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase();

  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.value };
    case "SET_HOSTNAME":
      return { ...state, hostname: action.value };
    case "SET_QUERYPATH":
      return { ...state, queryPath: action.value };
    case "SET_FAVICONURL":
      return { ...state, faviconUrl: action.value };
    case "FORMAT_NAME":
      return { ...state, name: formatN(state.name) };
    case "FORMAT_HOSTNAME":
      return { ...state, hostname: formatHN(state.hostname) };
    case "FORMAT_QUERYPATH":
      return { ...state, queryPath: formatQP(state.queryPath) };
    case "FORMAT_FAVICONURL":
      return { ...state, faviconUrl: formatFU(state.faviconUrl) };
    case "SET_ALL":
      return {
        ...state,
        name: action.name,
        hostname: action.hostname,
        queryPath: action.queryPath,
        faviconUrl: action.faviconUrl,
      };
    case "FORMAT_ALL":
      return {
        ...state,
        hostname: formatHN(state.hostname),
        queryPath: formatQP(state.queryPath),
        faviconUrl: formatFU(state.faviconUrl),
      };
    case "CLEAR_FORM":
      return action.defaults;
  }
};

export default ProviderFormReducer;
