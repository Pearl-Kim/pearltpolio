// 도시 입력창 + 검색 버튼

import useWeatherStore from "../store/weatherSore";

export default function SearchBar() {
    const { city, setCity, fetchWeather } = useWeatherStore();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="도시를 입력해 주세요."
                    className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">찾기</button>
            </div>
        </form>
    )
}