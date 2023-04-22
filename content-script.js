console.log('running script')

// Define a function to insert a random number into a text input element
function insertRandomNumber(e) {
    console.log(e.target.tagName)
    // Check if the element is an input field and the type is text
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        // Generate a random number between 0 and 99
        const randomNumber = Math.floor(Math.random() * 1000000);
        console.log(randomNumber)
        // Insert the random number into the input field
        e.target.value = randomNumber;
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