var fileSelector = document.createElement("input");
fileSelector.setAttribute("type", "file");
const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");
const btn = document.getElementById("btn");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    action.innerHTML = "<small>listening, please speak......</small>";
    window.speechSynthesis.speak("You can speak now");
    console.log("You can speak now!!");
};

recognition.onresult = function (event) {
    var text = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log('confidence:', confidence)
    console.log(text);
    searchFormInput.value = text;

    read(text);
};

function read(text) {
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;
    if (text.includes("time"))
        speech.text =
        "It is " +
        (+new Date().getHours() % 12) +
        " " +
        new Date().getMinutes() +
        " right now";
    else if (text.includes("my birthday"))
        speech.text =
        "Do you think you're famous! How the heck would I know your birthday!";
    else if (text.includes("My YouTube")) window.location.href = "https://mehtab39.github.io/myprojects/Youtube/index.html";
    else if (text.includes("YouTube"))
        window.location.href = `https://www.youtube.com/results?search_query=${text}`;
    else if (text.includes("owner"))
        speech.text = "My owner is Mehtab singh gill";

    window.speechSynthesis.speak(speech);
    searchFormInput.value = speech.text;
}