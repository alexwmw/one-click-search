export const normalizeHostname = (hostname) =>
  (hostname ?? "").trim().toLowerCase().replace(/^www\./, "");

export const hostnameFromUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol)
      ? normalizeHostname(parsed.hostname)
      : "";
  } catch (error) {
    return "";
  }
};

export const exclusionMatchesHostname = (site, hostname) => {
  const domain = normalizeHostname(site);
  const normalizedHost = normalizeHostname(hostname);
  return Boolean(
    domain &&
      normalizedHost &&
      (normalizedHost === domain || normalizedHost.endsWith(`.${domain}`))
  );
};

export const isHostnameExcluded = (hostname, sites = []) =>
  sites.some((site) => exclusionMatchesHostname(site, hostname));

export const updateExcludedSites = (sites = [], hostname, shouldExclude) => {
  const normalizedHost = normalizeHostname(hostname);
  if (!normalizedHost) return sites;

  if (shouldExclude) {
    return isHostnameExcluded(normalizedHost, sites)
      ? sites
      : [...sites, normalizedHost];
  }

  return sites.filter(
    (site) => !exclusionMatchesHostname(site, normalizedHost)
  );
};
