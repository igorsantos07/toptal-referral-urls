const notify = (() => {
  const $notification = document.querySelector('#notification')
  return (msg, style = 'success') => {
    $notification.innerText = msg
    $notification.classList.remove('success', 'info', 'error')
    $notification.classList.add(style, 'display')
    setTimeout(() => $notification.classList.remove('display'), 3000)
  }
})()

const $url = document.querySelector('#url')
const $hashtag = document.querySelector('#hashtag')

$hashtag.value = localStorage.hashtag || ''

//for some odd reason, chrome.tabs.getCurrent() doesn't seem to work?
//noinspection JSUnresolvedVariable,JSUnresolvedFunction
chrome.tabs.query({ active:true, currentWindow: true }, tabs => {
  $url.value = `${tabs[0].url}#${(localStorage.hashtag || '')}`
})

document.querySelector('#copy').onclick = () => {
  $url.disabled = false

  $url.select()
  try {
    if (document.execCommand('copy')) {
      notify('Copied!')
    } else {
      //noinspection ExceptionCaughtLocallyJS
      throw new Error('False returned from copy command')
    }
  } catch (err) {
    console.error(err)
    notify('Error on copying :(', 'error')
  }

  $url.disabled = true
}

document.querySelector('#save').onclick = () => {
  const hashtag = $hashtag.value.trim()
  if (!hashtag.length) {
    notify('The field is empty', 'error')
    return false
  }
  localStorage.hashtag = hashtag
  notify('Hashtag saved')
}
