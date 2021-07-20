//chrome.storage.sync.clear();

chrome.storage.sync.get(defaults, (result) => {
  chrome.storage.sync.set(result);
});
