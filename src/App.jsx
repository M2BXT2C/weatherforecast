 
import { useState, useEffect } from "react";
import { getWeatherByCity } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  // Log API Key
  useEffect(() => {
    console.log("Loaded API Key:", import.meta.env.VITE_API_KEY);
    getLocationWeather();
  }, []);

  // Get weather based on current location
  const getLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await getWeatherByCity(`${latitude},${longitude}`);
            setWeather(data);
          } catch (err) {
            console.error("❌ Error fetching weather by location:", err);
            alert("Unable to fetch weather for your location.");
          }
        },
        (error) => {
          setLocationPermissionDenied(true);
          console.error("❌ Geolocation error:", error);
          alert("Location access denied. Please enter a city manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    const query = city.includes(",") ? city : `${city},IN`;
    try {
      const data = await getWeatherByCity(query);
      setWeather(data);
    } catch (err) {
      console.error("❌ Error fetching weather:", err);
      alert("City not found or API error.");
      setWeather(null);
    }
  };

  const getBackground = (condition) => {
    switch (condition) {
      case "Clear":
        return "from-yellow-400 to-orange-500";
      case "Clouds":
        return "from-gray-400 to-gray-700";
      case "Rain":
        return "from-blue-500 to-blue-900";
      case "Snow":
        return "from-blue-200 to-white";
      case "Thunderstorm":
        return "from-purple-700 to-indigo-900";
      default:
        return "from-sky-400 to-indigo-600";
    }
  };

  const weatherCondition = weather?.weather?.[0]?.main;
  const background = getBackground(weatherCondition);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen transition-colors duration-500
          bg-gradient-to-br ${background} p-6 text-white
          dark:bg-gray-900 dark:text-white`}
      >
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">skyCastxt2c</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white text-black px-3 py-1 rounded-lg text-sm font-semibold dark:bg-gray-800 dark:text-white"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          {/* Location-based weather or city search */}
          {!weather && !locationPermissionDenied && (
            <p className="mt-4 text-white/80 dark:text-gray-300">
              Searching for weather based on your location...
            </p>
          )}

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city (e.g., Delhi or Delhi,IN)"
              className="w-full p-2 rounded-lg text-black dark:text-white dark:bg-gray-700"
            />
            <button
              onClick={handleSearch}
              className="bg-white text-black px-4 py-2 rounded-lg font-bold dark:bg-gray-800 dark:text-white"
            >
              Search
            </button>
          </div>

          {weather ? (
            <WeatherCard weather={weather} />
          ) : (
            <p className="mt-4 text-white/80 dark:text-gray-300">
              Enter a city name to see the weather or allow location access.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

