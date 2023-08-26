function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    console.log(response.data);
    let temperatureDisplay = document.querySelector("#temperature");
    let cityDisplay = document.querySelector("#city");
    let descriptionDisplay = document.querySelector("#description");
    let humidityDisplay = document.querySelector("#humidity");
    let windDisplay = document.querySelector("#wind");
    let dateDisplay = document.querySelector("#date");
    let iconDisplay = document.querySelector("#iconDisplay");

    temperatureDisplay.innerHTML = Math.round(response.data.temperature.current);
    cityDisplay.innerHTML = response.data.city;
    descriptionDisplay.innerHTML = response.data.condition.description;
    humidityDisplay.innerHTML = response.data.temperature.humidity;
    windDisplay.innerHTML = Math.round(response.data.wind.speed);
    dateDisplay.innerHTML = formatDate(response.data.time * 1000);
    iconDisplay.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconDisplay.setAttribute("alt", response.data.condition.description)
}

let city = `Madagascar`;
let apiKey = `faca83b09f0bt8700a3e54o84043fbae`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);