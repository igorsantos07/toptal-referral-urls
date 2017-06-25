// Based on Sample code from Chromium Extensions docs:
// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/pageAction/pageaction_by_url/background.js
// Docs: https://developer.chrome.com/extensions/declarativeContent

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL is correct...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: '.toptal.com' } //FIXME: also fires on platform pages
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
