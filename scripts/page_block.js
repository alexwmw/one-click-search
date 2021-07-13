const TOIconSrc =
  "chrome-extension://" + chrome.runtime.id + "/images/icon512.png";
const TOButtonHTML = "Click and hold to view the page";
const TOInfoHTML = (
  timer
) => `This page is being blocked by <span style="font-weight: 800;">Time Out : Page Blocker</span>.<br>
You will need to hold the button for ${timer} seconds to view the page.`;
const TOBodyCSS = {
  "background-image": "linear-gradient(to bottom left, black, #312)",
  color: "white",
  "text-align": "center",
  "font-size": "16pt",
  "font-weight": "500",
};
const TOIconCSS = {
  width: "128px",
  height: "128px",
  margin: "8% 0 2.5% 0",
  padding: "0",
  "font-size": "inherit",
  "font-weight": "inherit",
  "text-align": "inherit",
  border: "none",
  outline: "none",
};
const TOInfoCSS = {
  "font-family": "georgia",
  display: "block",
  margin: "10px",
  padding: "0",
  color: "inherit",
  "text-align": "inherit",
  "font-size": "inherit",
  "font-weight": "inherit",
  "line-height": "2em",
};
const TOUrlCSS = {
  "font-size": "0.8em",
  "font-weight": "400",
  display: "block",
  margin: "20px 0 0 0",
  padding: "0",
  color: "inherit",
  "text-align": "inherit",
  "line-height": "2em",
};
const TOButtonCSS = {
  position: "relative",
  display: "inline-block",
  top: "50px",
  width: "320px",
  height: "60px",
  padding: "35px 20px 0 20px",
  margin: "0",
  cursor: "pointer",
  color: "black",
  "user-select": "none",
  background: "lightgrey",
  "background-color": "lightgrey",
  "line-height": "1.1em",
  "box-shadow": "0 2px 0 0 darkgrey",
  "border-radius": "10px",
  "font-family": "helvetica",
  "font-size": "inherit",
  "font-weight": "inherit",
  "box-sizing": "content-box",
};
const TOButtonCSS_mousedown = {
  top: "51px",
  "box-shadow": "0 1px 0 0 darkgrey",
  opacity: "0.9",
};
const TOButtonCSS_mouseup = {
  top: "50px",
  "box-shadow": "0 2px 0 0 darkgrey",
  opacity: "1",
};

chrome.storage.local.get("seconds", function (result) {
  // Initialise timer & create elements
  var timerInit = result["seconds"];
  var timer = timerInit;
  var TOButton = document.createElement("div");
  var TOInfo = document.createElement("div");
  var TOUrl = document.createElement("div");
  var TOBody = document.body;
  var TOIcon = new Image();

  // Set properties, text & styles
  TOInfo.innerHTML = TOInfoHTML(timer);
  TOUrl.innerHTML =
    "<b> Blocked Site:</b>  " +
    new URLSearchParams(window.location.search).get("redirect");
  TOButton.innerHTML = TOButtonHTML;
  TOIcon.src = TOIconSrc;
  $(TOBody).css(TOBodyCSS);
  $(TOIcon).css(TOIconCSS);
  $(TOInfo).css(TOInfoCSS);
  $(TOUrl).css(TOUrlCSS);
  $(TOButton).css(TOButtonCSS);

  // setInterval function
  var tickInterval;

  // setTimeout function
  var btnTimeout;

  // redirect URL taken from page's query string
  const redirectUrl = new URLSearchParams(window.location.search).get(
    "redirect"
  );

  // chrome message
  const unblockRedirectUrl = { unblock: true, url: redirectUrl };

  // chrome callback
  const redirectToUrl = (response) => {
    if (response.ok) {
      window.location = redirectUrl;
    }
  };

  // Button click event
  $(TOButton)
    .bind("contextmenu", function (e) {
      return false;
    })
    .on("mousedown", function (e) {
      $(this).text(`Hold for ${timer} seconds...`);
      // Reduce the timer every 1 second and display on button
      tickInterval = setInterval(function () {
        timer--;
        $(TOButton).text(`Hold for ${timer} seconds...`);
      }, 1000);
      // When all the time is up, redirect the page to the blocked page
      btnTimeout = setTimeout(function () {
        chrome.runtime.sendMessage(unblockRedirectUrl, redirectToUrl);
      }, timer * 1000);
      $(this).css(TOButtonCSS_mousedown);
    });

  // On mouseup, clear the button click procedures
  TOBody.addEventListener("mouseup", function (event) {
    $(TOButton).stop(true, true);
    $(TOButton).css(TOButtonCSS_mouseup);
    $(TOButton).text(TOButtonHTML);
    clearInterval(tickInterval);
    clearTimeout(btnTimeout);
    timer = timerInit;
  });

  // DOM Manipulation
  $(TOIcon).appendTo(TOBody);
  $(TOInfo).appendTo(TOBody);
  $(TOUrl).appendTo(TOBody);
  $(TOButton).appendTo(TOBody);
  $(TOBody).show();
});
