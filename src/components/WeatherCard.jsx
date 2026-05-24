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
      whileHover={{ y: -6, scale: 1.02 }}
      className="board-card relative w-full max-w-sm rounded-[2rem] border border-white/60 bg-white/70 p-8 text-center shadow-2xl shadow-blue-200/60 backdrop-blur-xl"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none" />
      {/* 즐겨찾기 버튼 */}
      <button
        type="button"
        onClick={() => {
          isFavorite
            ? removeFavorite(weatherData.name)
            : addFavorite(weatherData.name);
        }}
        className="favorite-btn"
        title={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
      >
        {isFavorite ? (
          <StarOff className="text-yellow-400" size={26} />
        ) : (
          <Star className="text-gray-400 hover:text-yellow-400" size={26} />
        )}
      </button>

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: main.includes("cloud") ? [0, 2, -2, 0] : [0, 8, -8, 0],
        }}
        transition={{
          duration: main.includes("rain") ? 1.2 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-4 flex justify-center"
      >
        {getIcon()}
      </motion.div>

      <h2 className="text-2xl font-black text-slate-800">
        {weatherData.name}
      </h2>

      <p className="mt-4 text-6xl font-black tracking-tight text-slate-800">
        {Math.round(weatherData.main.temp)}°
      </p>

      <p className="mt-2 capitalize text-sm font-semibold text-blue-500">
        {weatherData.weather[0].description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-slate-400">Humidity</p>
          <p className="font-bold text-slate-700">{weatherData.main.humidity}%</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 p-4">
          <p className="text-slate-400">Wind</p>
          <p className="font-bold text-slate-700">{weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
}