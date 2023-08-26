function displayTemperature(response) {
    console.log(response.data);
    let temperatureDisplay = document.querySelector("#temperature");
    let cityDisplay = document.querySelector("#city");
    let descriptionDisplay = document.querySelector("#description");
    let humidityDisplay = document.querySelector("#humidity");
    let windDisplay = document.querySelector("#wind");
    temperatureDisplay.innerHTML = Math.round(response.data.temperature.current);
    cityDisplay.innerHTML = response.data.city;
    descriptionDisplay.innerHTML = response.data.condition.description;
    humidityDisplay.innerHTML = response.data.temperature.humidity;
    windDisplay.innerHTML = Math.round(response.data.wind.speed);
}

let city = `Makati`;
let apiKey = `faca83b09f0bt8700a3e54o84043fbae`;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);