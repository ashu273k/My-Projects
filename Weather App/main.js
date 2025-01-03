const apikey = "27f742e04ba9c075ddd24978c72de1a7";
const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector('form');
const themeToggleEl = document.getElementById('theme-toggle');

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

themeToggleEl.addEventListener("click", () => {
    document.body.classList.toggle('dark-mode');
    themeToggleEl.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
            `Pressure: ${data.main.pressure}hPa`,
            `Visibility: ${data.visibility / 1000}km`,
            `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`,
            `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`
        ];

        weatherDataEl.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;
        weatherDataEl.querySelector('.description').textContent = `${description}`;
        weatherDataEl.querySelector('.details').innerHTML = details.map(
            (detail) => `<div>${detail}</div>`
        ).join("");

        // Change background based on weather condition
        changeBackground(icon);

    } catch (error) {
        weatherDataEl.querySelector('.icon').innerHTML = "";
        weatherDataEl.querySelector('.temperature').textContent = "";
        weatherDataEl.querySelector('.description').textContent = "An error happened! Please enter a valid city name.";
        weatherDataEl.querySelector('.details').innerHTML = "";
    }
}

function changeBackground(icon) {
    const body = document.body;
    if (icon.includes('01')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny')";
    } else if (icon.includes('02') || icon.includes('03') || icon.includes('04')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy')";
    } else if (icon.includes('09') || icon.includes('10')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rain')";
    } else if (icon.includes('11')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?thunderstorm')";
    } else if (icon.includes('13')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow')";
    } else if (icon.includes('50')) {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?fog')";
    } else {
        body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}