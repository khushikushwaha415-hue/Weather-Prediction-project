const apiKey = "84783a9915024ac5b12132254250411";
const baseUrl = "https://api.weatherapi.com/v1/current.json";

const input = document.getElementById("locationInput");
const btn = document.getElementById("searchBtn");
const resultArea = document.getElementById("resultArea");

function showError(msg) {
    resultArea.innerHTML = `<div class='error'>${msg}</div>`;
}

function showWeather(data) {
    const loc = data.location;
    const cur = data.current;

    resultArea.innerHTML = `
    <div class="card">
      <div class="left">
        <p class="temp">${Math.round(cur.temp_c)}°C</p>
        <div class="small">${cur.condition.text} • ${loc.name}, ${loc.country}</div>
        <div class="meta">
          <div>Feels like: ${cur.feelslike_c}°C</div>
          <div>Humidity: ${cur.humidity}%</div>
          <div>Wind: ${cur.wind_kph} kph</div>
        </div>
      </div>
      <div class="icon-box">
        <img class="icon" src="https:${cur.condition.icon}" alt="weather icon" />
      </div>
    </div>
  `;
}

async function fetchWeather(query) {
    if (!query.trim()) return showError("Please enter a location");

    resultArea.innerHTML = "<div class='small'>Loading...</div>";

    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(query)}&aqi=yes`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) return showError(data.error.message);

        showWeather(data);
    } catch (err) {
        showError("Network error, please try again.");
    }
}

btn.addEventListener("click", () => fetchWeather(input.value));
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchWeather(input.value);
});