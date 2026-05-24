import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getForecast = async(city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
        throw new Error(".env에 api없음");
    }
    try {

        // 도시이름으로 5일치 예보 데이터 요청
        const res = await axios.get(BASE_URL, {
            params: {
                q: city, 
                appid: apiKey, 
                units: "metric"
            },
        });
        return res.data.list;
    } catch (err) {
        console.error("도시api오류", err);
        throw new Error(`Forecast API error (${err.response?.status}): ${err.response?.data?.message || err.message}`);
    }
};