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
    else if (text.includes("weather")) {
        text= text.split(" ")[0]
        getWeather(text)
    }

    window.speechSynthesis.speak(speech);
    searchFormInput.value = speech.text;
}

document.getElementById("city").addEventListener("click", checkweather);

function checkweather(){
    console.log("hi")
    document.getElementById("city").innerHTML ="Checking... <br> Please wait"
    window.navigator.geolocation
    .getCurrentPosition(successfulLookup, console.log);
}


    async function successfulLookup(position){
        const {
            latitude,
            longitude
        } = position.coords;
       await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f731490488974beaad4350748cbe4a5e`)
            .then(response => response.json())
            .then((data) => {
                getWeather(data.results[0].components.state_district);
              });
     }
    function showWeather(city, data) {
        document.getElementById("city").innerHTML = `Temperature in ${city} City is ${data}° C`
        
    } 

    async function getWeather(city) {
        var res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2943c82a02fef99d328247102d3e473f`
        );
        let data = await res.json();
        var temperature = Math.round(data.main.temp - 273.15);
        console.log(temperature);
        showWeather(city, temperature);
      }
    
    

               