console.log('running script')

// Define a function to insert a random number into a text input element
function insertRandomNumber(e) {
    console.log(e.target.tagName)
    // Check if the element is an input field and the type is text
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        // Generate a random number between 0 and 99
        // const randomNumber = Math.floor(Math.random() * 100000000);
        let randomNumber;
        chrome.storage.sync.get('minTime', function (result) {
            chrome.storage.sync.get('maxTime', function (result2) {
                console.log(result.minTime)
                console.log(result2.maxTime)
                randomNumber = getRandomNumber(parseInt(result.minTime), parseInt(result2.maxTime));

                console.log(randomNumber)
                // Insert the random number into the input field
                e.target.value = randomNumber;
            })
        })
    }
}

// Listen for the message from popup.js to toggle the random number insertion
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.isEnabled) {
        console.log(request.isEnabled)
        // Attach the insertRandomNumber function to the click event of the document
        document.addEventListener("click", insertRandomNumber);
    } else {
        // Remove the insertRandomNumber function from the click event of the document
        document.removeEventListener("click", insertRandomNumber);
    }
});

function getRandomNumber(minVal, maxVal) {
    let randomNum = Math.random() * (maxVal - minVal) + minVal;
    return parseFloat(randomNum.toFixed(6));
}