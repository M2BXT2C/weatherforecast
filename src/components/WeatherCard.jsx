import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiNightClear,
} from "react-icons/wi";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, main, weather: desc, wind } = weather;

  // Choose icon based on main weather condition
  const getIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={60} />;
      case "Clouds":
        return <WiCloudy size={60} />;
      case "Rain":
        return <WiRain size={60} />;
      case "Thunderstorm":
        return <WiThunderstorm size={60} />;
      case "Snow":
        return <WiSnow size={60} />;
      case "Fog":
      case "Mist":
      case "Haze":
        return <WiFog size={60} />;
      case "Night":
        return <WiNightClear size={60} />;
      default:
        return <WiDaySunny size={60} />;
    }
  };

  const condition = desc[0].main;

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-white w-full max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold">{name}</h2>
      <div className="flex items-center justify-center gap-4 my-2">
        {getIcon(condition)}
        <p className="text-xl">
          {desc[0].main} - {desc[0].description}
        </p>
      </div>
      <div className="mt-4 space-y-1 text-lg">
        <p>🌡️ Temp: {main.temp}°C</p>
        <p>💧 Humidity: {main.humidity}%</p>
        <p>💨 Wind: {wind.speed} m/s</p>
      </div>
    </div>
  );
}
