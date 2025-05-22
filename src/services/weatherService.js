
// import axios from 'axios';

// const API_KEY = import.meta.env.VITE_API_KEY;
// const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// export const getWeatherByCity = async (city) => {
//   if (!API_KEY) {
//     console.error("❌ API key is missing. Check your .env file.");
//     throw new Error("API key missing");
//   }

//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         q: city,
//         appid: API_KEY,
//         units: 'metric'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("🌩️ Weather API error:", error.response?.data || error.message);
//     throw error;
//   }
// };
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (input) => {
  let url = "";

  if (input.includes(",") && !isNaN(input.split(',')[0])) {
    // Treat as coordinates
    const [lat, lon] = input.split(',').map(Number);
    url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    // Treat as city name
    url = `${BASE_URL}?q=${input}&appid=${API_KEY}&units=metric`;
  }

  console.log("📡 API Request URL:", url);  // Debug output
  const response = await axios.get(url);
  return response.data;
};

