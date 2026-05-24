// 날씨 표시 카드

import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudSnow, Star, StarOff } from "lucide-react";
import useWeatherStore from "../store/weatherSore";

export default function WeatherCard() {
  // 날씨 검색 관련 전역 상태
  const { weatherData, loading, error, favorites, addFavorite, removeFavorite } =
    useWeatherStore();

  if (loading) return <p className="text-gray-500 mt-6">잠시만 기다려 주세요</p>;
  if (error) return <p className="text-gray-500 mt-6">{error}</p>;
  if (!weatherData)
    return <p className="text-gray-400 mt-6">도시명을 다시 입력해주세요!!</p>;

  // 날씨 상태별 아이콘 매핑
  const main = weatherData.weather[0].main.toLowerCase();

  const getIcon = () => {
    if (main.includes("cloud")) return <Cloud size={48} className="text-cloudy" />;
    if (main.includes("rain")) return <CloudRain size={48} className="text-rainy" />;
    if (main.includes("snow")) return <CloudSnow size={48} className="text-blue-300" />;
    return <Sun size={48} className="text-summy" />;
  };

  // 즐겨찾기 여부 확인
  const isFavorite = favorites.includes(weatherData.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 text-center w-80 border border-blue-100"
    >
      {/* 즐겨찾기 버튼 */}
      <button
        type="button"
        onClick={() => {
          isFavorite
            ? removeFavorite(weatherData.name)
            : addFavorite(weatherData.name);
        }}
        className="absolute top-4 right-4"
        title={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
      >
        {isFavorite ? (
          <StarOff className="text-yellow-400" size={26} />
        ) : (
          <Star className="text-gray-400 hover:text-yellow-400" size={26} />
        )}
      </button>

      <div className="flex justify-center mb-3">{getIcon()}</div>

      <h2 className="text-3xl font-bold text-primary">
        도시명 : {weatherData.name}
      </h2>

      <p className="text-5xl font-extrabold text-gray-800 mt-2">
        섭씨 : {Math.round(weatherData.main.temp)}°C
      </p>

      <p className="capitalize text-gray-600">
        {weatherData.weather[0].description}
      </p>

      <p className="text-gray-500 text-sm mt-3">
        💧 Humidity: {weatherData.main.humidity}% | 🌬️ Wind:{" "}
        {weatherData.wind.speed} m/s
      </p>
    </motion.div>
  );
}