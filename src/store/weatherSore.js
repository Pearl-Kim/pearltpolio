// 전역 상태(Zustand) — 도시, 날씨 데이터 관리

import { create } from "zustand";
import { getWeather, getWeatherByCoords } from "../api/getWeather";
import { getForecast } from "../api/getForecast";

const useWeatherStore = create((set) => ({
    city: "Seoul",
    weatherData: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    getcastData: null,
    loading: false,
    error: null,

    setCity: (city) => set({ city }),

    fetchWeather: async () => {
        set({ loading: true, error: null }); // 초기화

        try {
            const data = await getWeather(useWeatherStore.getState().city); 
            
            // 두 api 동시에 호출
            const city = useWeatherStore.getState().city;
            const [wether, forecast] = await Promise.all([
                getWeather(city),
                getForecast(city)
            ]);

            // 데이터 상태 업데이트
            set({ 
                weatherData: data, 
                loading: false,
                forecastData: forecast,
             });
        } catch (err) {
            set({ error: "fail", loading: false });
        }
    },

    // 즐겨찾기
    addFavorite: (city) =>
        set((state) => {
            if(state.favorites.includes(city)) return state;
            const updated = [...state.favorites, city];
            localStorage.setItem("favorites", JSON.stringify(updated));
            return {favorites: updated};
        }
    ),
    // 즐겨찾기 해제
    removeFavorite: (city) =>
        set((state) => {
            const updated = state.favorites.filter((c) => c !== city);
            localStorage.setItem("favorites", JSON.stringify(updated));
            return {favorites: updated};
        }
    ),
    // GPS용
    fetchWeatherByCoords: async (lat, lon) => {
        set({ loading: true, error: null });

        try {
            const data = await getWeatherByCoords(lat, lon);

            set({
                weatherData: data,
                loading: false,
            });

        } catch (err) {
            set({
                error: "현재 위치 날씨를 불러오지 못했습니다.",
                loading: false,
            });
        }
    },

}));

export default useWeatherStore;