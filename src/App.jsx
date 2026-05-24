import { useEffect } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";

import { getWeatherByCoords } from "./api/getWeather";
import useWeatherStore from "./store/weatherSore";
import useThemStore from "./store/themsStore";

export default function App() {
  const setWeather = useThemStore((state) => state.setWeather); // 도시명
  const fetchWeatherByCoords = useWeatherStore( // gps 현재 도시 (store에서 날씨 가져오기)
    (state) => state.fetchWeatherByCoords
  );
  const weatherData = useWeatherStore((state) => state.weatherData);

  const today = new Date().toLocaleDateString("ko-KR", { // 최상단 날짜
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  // 배경
  const getBackground = () => {
    if (!weatherData) {
      return "bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100";
    }

    const main = weatherData.weather[0].main.toLowerCase();

    if (main.includes("cloud")) {
      return "bg-gradient-to-br from-slate-300 via-slate-200 to-blue-100";
    }

    if (main.includes("rain")) {
      return "bg-gradient-to-br from-slate-700 via-slate-600 to-blue-900";
    }

    if (main.includes("snow")) {
      return "bg-gradient-to-br from-white via-slate-100 to-blue-50";
    }

    return "bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-200";
  };

  useEffect(() => {
    // 앱 실행 시 브라우저 위치 정보 요청
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // 좌표로 현재 위치 날씨 데이터 가져오기
      const data = await getWeatherByCoords(latitude, longitude);

      // 가져온 날씨 데이터를 전역 상태에 저장
      setWeather(data);

      //현재 위치기반 자동출력
      fetchWeatherByCoords(latitude, longitude);
    });
  }, [setWeather]);

  return (
    <div className={`board-wrap min-h-screen transition-all duration-700 ${getBackground()} flex flex-col items-center px-4 py-10`}>
      <div className="board-block w-full max-w-5xl">
        <header className="text-center mb-10 py-6">
          <p className="text-slate-400 text-sm mb-2">
            {today}
          </p>
          <p className="text-sm font-semibold text-blue-500 tracking-[0.3em] uppercase mt-20 py-4">
            pearl's Weather
          </p>
          <h1 className="text-5xl font-black text-slate-800 mt-20 py-4">
            Weather Dashboard
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            실시간 날씨와 주간 예보를 한눈에 확인하세요.
          </p>
        </header>

        <div className="weather-card mt-20 py-4">
          <SearchBar />
          <WeatherCard />
          <ForecastChart />
        </div>
      </div>
    </div>
  );
}