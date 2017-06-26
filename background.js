/** ******************* Configures the PageAction activation ******************* */
// Based on Sample code from Chromium Extensions docs:
// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/pageAction/pageaction_by_url/background.js
// Docs: https://developer.chrome.com/extensions/declarativeContent

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: '.toptal.com' } //FIXME: also fires on platform pages
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

/** ******************* Configures the Context Menu entry ******************* */
chrome.contextMenus.removeAll()
chrome.contextMenus.create({
  id: 'copy',
  title: 'Copy URL with my referral hashtag',
  contexts: ['page','link'],
  documentUrlPatterns: ['*://*.toptal.com/*'],
  targetUrlPatterns: ['*://*.toptal.com/*']
})

const $body = document.querySelector('body')
chrome.contextMenus.onClicked.addListener(info => {
  const url = info.linkUrl || info.pageUrl
  const hashtag = localStorage.hashtag
  if (hashtag) {
    const el = document.createElement('input')
    el.value = `${url}#${hashtag}`
    $body.appendChild(el)
    el.select()
    document.execCommand('copy')
  } else {
    chrome.notifications.create('no-hashtag', {
      type: 'basic',
      iconUrl: 'icons/logo-trans-256.png',
      title: 'Whoops... No hashtag set',
      message: "It seems you have yet to configure your referral URL. Find it in the Platform and paste in the extension popup.\nThe extension button could be hidden in your Chrome Menu.",
      requireInteraction: true,
      buttons: [ { title: 'Go to Platform' } ]
    })
  }
})

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  switch (notificationId) {
    case 'no-hashtag':
      switch (buttonIndex) {
        case 0:
          chrome.tabs.create({ url: 'https://www.toptal.com/platform/referrals/instructions' })
        break
      }
    break
  }
  chrome.notifications.clear(notificationId)
})