document.addEventListener("DOMContentLoaded", function () {


    const checkbox = document.getElementById("toggle");
    // Get the current toggle state from storage and set the checkbox accordingly
    // chrome.storage.sync.get("isEnabled", function (data) {
    //     checkbox.checked = data.isEnabled;
    // });
    checkbox.checked = false;

    // Save the state of the toggle to storage when it is changed
    checkbox.addEventListener("change", function () {
        const isEnabled = checkbox.checked;
        chrome.storage.sync.set({
            isEnabled: isEnabled
        });

        // Send a message to the content script to toggle the random number insertion
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                isEnabled: isEnabled
            });
        });
    });

    let minTime = document.getElementById("minTime")
    let maxTime = document.getElementById("maxTime")
    let btnSave = document.querySelector(".btn-save")
    btnSave.addEventListener("click", function () {
        console.log('clicked')
        console.log(minTime.value)
        console.log(maxTime.value)
        chrome.storage.sync.set({
            'minTime': minTime.value,
            'maxTime': maxTime.value
        })

    });
});