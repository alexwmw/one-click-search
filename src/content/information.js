const modKey = (userAgentStr) => {
  if (userAgentStr.indexOf("Mac") > 0) {
    return "⌘ command";
  } else if (userAgentStr.indexOf("Win") > 0) {
    return "ctrl";
  } else {
    return "ctrl";
  }
};

import { version } from "../manifest.json";

const information = [
  `
  ### Version ${version}
  ### Search provider settings
  You can edit the settings of each search provider by clicking on the **⋮ more** icons on the **search providers** tab. The requirements for each form field are:\n\n
  <div>
  #### Provider name
  A unique name for the search provider.
  #### Hostname
  The website to be searched. Usually this will be everything between and including 'www' and '.com'. Examples include: www.example.com, site.example.org, example.de
  #### Query path
  The URL string (after the slash '/') which determines the path to the search results page, including a placeholder $TEXT$ for the search term. \n\n
  The query path of a URL will often be made up of multiple key/value pairs joined by '&'. You should try to ensure the string entered here only includes the necessary key/value pairs. \n\n
  For example, 'search?q=$TEXT$&page=1' can be shortened to 'search?q=$TEXT$'
  #### Favicon URL (optional)
  The URL of the website's favicon (icon). If left blank, the default favicon URL '<span>https</span>://[hostname]/favicon.ico' will be used.
  </div>
  `,
  `
  ### Adding a new search provider
  You can  add your own custom search providers by clicking the Add New Provider button. \n\n
  The easiest way to add your own search provider is to use the auto-fill function by following the instructions in the new provider form. \n\n
  Alternatively, follow these instructions. \n\n
  Using 'bbc.co.uk' as an example:\n\n
  - Go to www.bbc.co.uk
  - Locate the search box and type a specific word such as 'text'
  - On the search results page, take note of the page's URL; e.g., '<span>https</span>://www.bbc.co.uk/search?q=text&page=1'. Then, fill in the details in the new provider form as follows:
      - Provider name: BBC
      - Hostname: www.bbc.co.uk
      - Query path: search?q=$TEXT$ (replacing whatever word you searched for with the placeholder '$TEXT$', and dropping anything after that starts with '&')
      - Favicon URL: leave blank or set a specific URL if you have one
  `,
  `
  ### Opening a search in the background
  It is possible to open searches in a background tab so as not to interrupt your browsing experience. \n\nYou can do so by pressing and holding the **${modKey(
    navigator.userAgent
  )} key** when clicking on the search icon; or if you have a mouse, clicking the icon using the scroll wheel/middle button. (This functionality is the same for all hyperlinks in Chrome.)
  `,
  `
  ### The 'go-to' function
  Every time you highlight text on a web page, the extension will try to determine if the text you have selected is a valid website URL.\n\nIf the selected text has the form of a URL or hostname (e.g., www.example.com, site.example.org, etc.), a **go-to icon** will appear as the first icon in the popup.\n\nClick the go-to icon to follow the link. This saves you from having to copy/paste the URL into your search bar in order to reach the website. 
  `,
];

export default information;
