
const apiKey = '3RJQMCG6Q6FAYLVEJVSWU5F23';
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

document.addEventListener("DOMContentLoaded", () => {

  const loadingElement = document.querySelector("#loading");
  document.querySelector('#weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const locationInput = document.querySelector('#location');
    const location = locationInput.value.trim();

    if (location) {
      loadingElement.classList.remove("hidden");

      fetchWeatherData(location);
    } else {
      alert("Please enter a location.");
    }
  })

  async function fetchWeatherData(location) {

    // const units = unitsSelect.value;
    const url = `${apiUrl}${location}?&key=${apiKey}`;

    try {
      const response = await fetch(url, { mode: "cors" });

      if (!response.ok) {
        throw new Error(
          "Failed to fetch weather. Please check your API key or the server."
        );
      }

      const data = await response.json();
      console.log("Raw API Response:", data);

      const weatherData = processWeatherData(data);
      console.log("Processed Weather Data:", weatherData);

      displayWeatherData(weatherData);

    } catch (error) {

      alert('An error occurred. Please try again.');
      console.error(error);

    } finally {
      loadingElement.classList.add("hidden");
    }
  }

  function processWeatherData(data) {

    if (!data || !data.currentConditions) {
      throw new Error('Invalid data received from API');
    }

    const processedData = {
      location: data.address || 'Unknown Location',
      temperature: data.currentConditions.temp || 'N/A',
      description: data.currentConditions.conditions || 'N/A',
      humidity: data.currentConditions.humidity || 'N/A',
      windSpeed: data.currentConditions.windSpeed || 'N/A',
      icon: data.currentConditions.icon || 'default',
    }

    console.log(processedData);
    return processedData;
  }

  function displayWeatherData(weatherData) {

    const weatherDisplay = document.querySelector("#weather-display");
    weatherDisplay.innerHTML = `<h2>Weather in ${weatherData.location}</h2>
      <p><strong>Temperature:</strong> ${weatherData.temperature}°C</p>
      <p><strong>Condition:</strong> ${weatherData.description}</p>
      <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${weatherData.windSpeed} km/h</p>
      <p><strong>icon:</strong> ${weatherData.icon}</p>`

  }

});