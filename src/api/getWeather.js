import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


// 도시 검색하여 날씨 가져오기
export const getWeather = async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  try {
    const response = await axios.get(BASE_URL, { // 오픈 api 서버에 get 요청
      params: {
        q: city,
        appid: apiKey,
        units: "metric", // 섭씨
      },
    });
    return response.data; // 실제 데이터만 반환
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};

// gps 버전 : 좌표 기반 현재 날씨 가져오기
export const getWeatherByCoords = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat, // 도시
        lon: lon, // 좌표
        appid: apiKey,
        units: "metric",
      },
    });

    return response.data;

  } catch (error) {
    console.error("Coords Weather API Error:", error);
    throw error;
  }
};