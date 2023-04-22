// Get the current tab and execute the script in it
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
        files: ['content-script.js']
    })
});