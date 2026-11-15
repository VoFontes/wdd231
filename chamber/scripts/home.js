// ==========================================
// SONORA CHAMBER OF COMMERCE - HOME PAGE
// ==========================================


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


// ==========================================
// 2. FOOTER INFORMATION
// ==========================================

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// ==========================================
// 3. WEATHER INFORMATION
// ==========================================

const weatherContainer = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#weather-forecast");

const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm"
};

async function getWeather() {
    if (!weatherContainer || !forecastContainer) return;

    const latitude = 29.0729;
    const longitude = -110.9559;

    const weatherURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=America%2FHermosillo&forecast_days=4`;

    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather information is unavailable.");
        }

        const data = await response.json();

        displayCurrentWeather(data.current);
        displayWeatherForecast(data.daily);

    } catch (error) {
        console.error("Weather error:", error);

        weatherContainer.textContent =
            "Weather information is temporarily unavailable.";

        forecastContainer.textContent =
            "The forecast could not be loaded.";
    }
}


function displayCurrentWeather(weather) {
    weatherContainer.replaceChildren();

    const temperature = document.createElement("p");
    temperature.textContent =
        `Temperature: ${Math.round(weather.temperature_2m)} °C`;

    const description = document.createElement("p");
    description.textContent =
        weatherDescriptions[weather.weather_code] || "Weather conditions";

    const feelsLike = document.createElement("p");
    feelsLike.textContent =
        `Feels like: ${Math.round(weather.apparent_temperature)} °C`;

    const humidity = document.createElement("p");
    humidity.textContent =
        `Humidity: ${weather.relative_humidity_2m}%`;

    const wind = document.createElement("p");
    wind.textContent =
        `Wind: ${weather.wind_speed_10m} km/h`;

    weatherContainer.append(
        temperature,
        description,
        feelsLike,
        humidity,
        wind
    );
}


function displayWeatherForecast(daily) {
    forecastContainer.replaceChildren();

    const today = daily.time[0];

    const futureDays = daily.time
        .map((date, index) => ({
            date,
            code: daily.weather_code[index],
            max: daily.temperature_2m_max[index],
            min: daily.temperature_2m_min[index]
        }))
        .filter(day => day.date > today)
        .slice(0, 3);

    futureDays.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-day");

        const date = document.createElement("h4");
        const dateObject = new Date(`${day.date}T12:00:00`);

        date.textContent = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            timeZone: "America/Hermosillo"
        }).format(dateObject);

        const description = document.createElement("p");
        description.textContent =
            weatherDescriptions[day.code] || "Weather conditions";

        const temperature = document.createElement("p");
        temperature.textContent =
            `${Math.round(day.min)} °C / ${Math.round(day.max)} °C`;

        card.append(date, description, temperature);
        forecastContainer.appendChild(card);
    });
}


// ==========================================
// 4. BUSINESS SPOTLIGHTS
// ==========================================

const spotlightsContainer =
    document.querySelector("#spotlights-container");


async function getSpotlights() {
    if (!spotlightsContainer) return;

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business members.");
        }

        const members = await response.json();

        // Select only Gold and Silver members.
        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Shuffle the eligible members randomly.
        const shuffledMembers = [...eligibleMembers].sort(
            () => Math.random() - 0.5
        );

        // Display three random businesses.
        const selectedMembers = shuffledMembers.slice(0, 3);

        spotlightsContainer.replaceChildren();

        selectedMembers.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            const name = document.createElement("h3");
            name.textContent = member.name;

            const logo = document.createElement("img");
            logo.src = `images/${member.image}`;
            logo.alt = `${member.name} logo`;
            logo.loading = "lazy";

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${member.phone}`;

            const address = document.createElement("p");
            address.textContent = `Address: ${member.address}`;

            const membership = document.createElement("p");
            membership.textContent =
                member.membership === 3 ? "Gold Member" : "Silver Member";

            const website = document.createElement("a");

            website.href = member.website;
            website.textContent = "Visit Website";
            website.target = "_blank";
            website.rel = "noopener noreferrer";

            card.append(
                name,
                logo,
                phone,
                address,
                membership,
                website
            );

            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlights error:", error);

        spotlightsContainer.textContent =
            "Business spotlights are temporarily unavailable.";
    }
}


// ==========================================
// 5. START HOME PAGE FUNCTIONS
// ==========================================

getWeather();
getSpotlights();