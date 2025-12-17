const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");

const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");

async function checkWeather(city) {
    try {
        // Geo
        if(!city) return;

        const geocodingURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geocodingURL);
        const geoData = await geoResponse.json();
        
        if(!geoData.results || geoData.results.length === 0) {
            weatherSection.style.display = "none";
            errorSection.style.display = "block";
            return;
        } 

        weatherSection.style.display = "block";
        errorSection.style.display = "none";
    
        const { latitude, longitude, name } = geoData.results[0];

        localStorage.setItem("city", name);
        cityName.textContent = name;

        // Weather
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const {temperature, windspeed} = weatherData.current_weather;

        temp.textContent = `${temperature}°C`;
        wind.textContent = windspeed;

    } catch (error) {
        console.error(error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const savedCity = localStorage.getItem("city");
    if (savedCity) {
        cityInput.value = savedCity;
        checkWeather(savedCity);
    }
});

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    checkWeather(city);
});


