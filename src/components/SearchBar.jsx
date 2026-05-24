// 도시 입력창 + 검색 버튼 (직접 도시 검색)

import useWeatherStore from "../store/weatherSore";

export default function SearchBar() {
    const { city, setCity, fetchWeather } = useWeatherStore();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    }

    return (
        <form onSubmit={handleSubmit} className="search-form mt-20 py-4">
            <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/70 bg-white/70 p-2 shadow-xl shadow-blue-200/50 backdrop-blur-xl">
                <input
                    className="flex-1 bg-transparent px-5 py-3 text-slate-700 outline-none placeholder:text-slate-400"
                    placeholder="Search city..."
                />
                <button
                    className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
        </form>
    )
}