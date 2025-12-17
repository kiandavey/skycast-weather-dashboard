# ☁️ SkyCast Weather Dashboard

**SkyCast** is a responsive weather application that allows users to search for real-time weather conditions in any city. It demonstrates the power of **Asynchronous JavaScript** by chaining multiple API requests to convert city names into weather data.


## 🚀 Features

* **City Search**: Input any city name to retrieve current weather data.
* **Smart Geocoding**: Automatically converts city names (e.g., "London") into geographic coordinates (Latitude/Longitude) using the Open-Meteo Geocoding API.
* **Data Persistence**: Uses `localStorage` to remember the last searched city, so the user sees their preferred location immediately upon refreshing the page.
* **Error Handling**: Gracefully handles invalid city names or network issues by displaying user-friendly error messages.
* **No API Keys**: Uses the free Open-Meteo API, requiring no hidden environment variables.

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3 (Flexbox & Gradients), Vanilla JavaScript.
* **APIs**:
    1.  **Open-Meteo Geocoding API**: Converts City Name → Lat/Lon.
    2.  **Open-Meteo Weather API**: Uses Lat/Lon → Temperature & Wind Speed.

## 💻 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/skycast-weather-dashboard.git](https://github.com/yourusername/skycast-weather-dashboard.git)
    ```
2.  **Run the App**:
    * Since this project uses vanilla HTML/JS, you can simply open `index.html` in your browser.
    * No `npm install` required!

## 🧩 Code Logic Highlights

### Chained API Requests
The app performs a two-step "waterfall" fetch operation:
1.  **Fetch 1**: Calls the Geocoding API to find the location.
2.  **Logic**: Extracts `latitude` and `longitude` from the first result.
3.  **Fetch 2**: Passes those coordinates to the Weather API to get the actual forecast.

```javascript
// Example Logic
const geoResponse = await fetch(geocodingURL);
const geoData = await geoResponse.json();
const { latitude, longitude } = geoData.results[0];

const weatherURL = `...latitude=${latitude}&longitude=${longitude}...`;
const weatherResponse = await fetch(weatherURL);
