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
    let temperatureDisplay = document.querySelector("#temperature");
    let cityDisplay = document.querySelector("#city");
    let descriptionDisplay = document.querySelector("#description");
    let humidityDisplay = document.querySelector("#humidity");
    let windDisplay = document.querySelector("#wind");
    let dateDisplay = document.querySelector("#date");
    let iconDisplay = document.querySelector("#iconDisplay");

    celsiusTemperature = response.data.temperature.current;

    temperatureDisplay.innerHTML = `${Math.round(response.data.temperature.current)}`;
    cityDisplay.innerHTML = response.data.city;
    descriptionDisplay.innerHTML = response.data.condition.description;
    humidityDisplay.innerHTML = response.data.temperature.humidity;
    windDisplay.innerHTML = Math.round(response.data.wind.speed);
    dateDisplay.innerHTML = formatDate(response.data.time * 1000);
    iconDisplay.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconDisplay.setAttribute("alt", response.data.condition.description)
}

function search(city) {
    let apiKey = `faca83b09f0bt8700a3e54o84043fbae`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureDisplay = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureDisplay.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureDisplay = document.querySelector("#temperature");
    temperatureDisplay.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

function getLocation(position) {
    let apiKey = `faca83b09f0bt8700a3e54o84043fbae`;
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

    axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

navigator.geolocation.getCurrentPosition(getLocation);

search(getLocation);