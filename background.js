//chrome.storage.sync.clear();

var defaults = {
  providers: {
    Google: {
      name: "Google",
      url: "https://www.google.com/",
      queryKey: "search?q=",
      visibility: "visible",
      position: 0,
    },
    Wikipedia: {
      name: "Wikipedia",
      url: "https://www.wikipedia.org/",
      queryKey: "w/index.php?search=",
      visibility: "visible",
      position: 1,
    },
    Wiktionary: {
      name: "Wiktionary",
      url: "https://www.wiktionary.org/",
      queryKey: "w/index.php?search=",
      visibility: "hidden",
      position: 2,
    },
    Amazon: {
      name: "Amazon",
      url: "https://www.amazon.co.uk/",
      queryKey: "s?k=",
      visibility: "disabled",
      position: 3,
    },
    eBay: {
      name: "eBay",
      url: "https://www.ebay.co.uk/",
      queryKey: "sch/i.html?_nkw=",
      visibility: "disabled",
      position: 4,
    },
    YouTube: {
      name: "YouTube",
      url: "https://www.youtube.com/",
      queryKey: "results?search_query=",
      faviconUrl:
        "https://m.youtube.com/static/apple-touch-icon-120x120-precomposed.png",
      visibility: "visible",
      position: 5,
    },
    Twitter: {
      name: "Twitter",
      url: "https://www.twitter.com/",
      queryKey: "search?q=",
      visibility: "disabled",
      position: 6,
    },
    Bing: {
      name: "Bing",
      url: "https://www.bing.com/",
      queryKey: "search?q=",
      visibility: "disabled",
      position: 7,
    },
    Gmail: {
      name: "Gmail",
      url: "https://mail.google.com/",
      queryKey: "mail/u/0/#search/",
      visibility: "hidden",
      position: 8,
    },
    Reddit: {
      name: "Reddit",
      url: "https://www.reddit.com/",
      queryKey: "search?q=",
      visibility: "disabled",
      position: 9,
    },
    Facebook: {
      name: "Facebook",
      url: "https://www.facebook.com/",
      queryKey: "search/top?q=",
      visibility: "disabled",
      position: 10,
    },
    // additional functions
    Copy: {
      name: "Copy",
      isFunc: true,
      faviconUrl: "/images/copy.ico",
      visibility: "hidden",
      position: 11,
      execute: "copy",
    },
  },
  options: {
    popUp_fadeOutTime: {
      order: 1,
      label: "Number of seconds to fade-out the pop-up",
      value: "5",
      type: "input",
      classList: ["options-input"],
      attr: {
        type: "range",
        min: 0,
        max: 10,
        step: 0.5,
        id: "popUp_fadeOutTime",
      },
    },
    popUp_fadeDelay: {
      order: 2,
      label: "Number of seconds of inactivity before fade-out begins",
      value: "5",
      type: "input",
      classList: ["options-input"],
      attr: {
        type: "range",
        min: 0,
        max: 10,
        step: 0.5,
        id: "popUp_fadeDelay",
      },
    },
    hiddenIcons_showDelay: {
      order: 3,
      label: "Number of seconds to hover before showing hidden icons",
      value: "1",
      type: "input",
      classList: ["options-input"],
      attr: {
        type: "range",
        min: 0,
        max: 10,
        step: 0.5,
        id: "hiddenIcons_showDelay",
      },
    },
    hrefTarget: {
      order: 4,
      value: "New tab",
      label: "Open search in...",
      type: "select",
      classList: ["options-input"],
      valList: ["New tab", "Current tab"],
      attr: { type: "select", id: "hrefTarget" },
    },
  },
};


chrome.storage.sync.get(defaults, (result) => {
  chrome.storage.sync.set(result);
});
