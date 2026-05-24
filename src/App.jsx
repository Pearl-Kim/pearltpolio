import { useEffect } from "react";
import "./App.css";

import SearchBar from "./components/searchBar";
import WeatherCard from "./components/weatherCard";
import ForecastChart from "./components/forecastChart";

import { getWeatherByCoords } from "./api/getWeather";
import useWeatherStore from "./store/weatherSore";
import useThemStore from "./store/themsStore";

export default function App() {
  const setWeather = useThemStore((state) => state.setWeather); // 도시명
  const fetchWeatherByCoords = useWeatherStore( // gps 현재 도시 (store에서 날씨 가져오기)
    (state) => state.fetchWeatherByCoords
  );

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
    <div>
      <h1>Weather Dashboard</h1>

      <SearchBar />
      <WeatherCard />
      <ForecastChart />
    </div>
  );
}