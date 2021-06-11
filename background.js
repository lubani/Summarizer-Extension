var rule1 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: "www.google.com", schemes: ["https"] },
      css: ["input[type='password']"],
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};
var rule2 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: "www.google.com", schemes: ["https"] },
      css: ["input[type='password']"],
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["video"],
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};
chrome.runtime.onInstalled.addListener(function (details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          // When a page contains a <video> tag...
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ["http", "https"] },
          }),
        ],
        // ... show the page action.
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
