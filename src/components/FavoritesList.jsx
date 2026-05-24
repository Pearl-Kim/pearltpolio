// 도시 클릭하면 그 날씨로 변환되는 기능
import useWeatherStore from "../store/weatherSore";


export default function FavoritesList() {
    const { favorites, setCity, fetchWeather } = useWeatherStore();

    //즐겨찾기 비어 있으면 안내문구 표시
    if (favorites.length === 0)
        return (
            <p className="text-gray-400 mt-6">아직 즐겨찾기가 없어요! 추가해요세요!</p>
        );
    
    // 버튼 클릭 시 해당 도시로 전환 + 날짜 겟
    const handleSelect = (city) => {
        setCity(city);
        fetchWeather();
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center mt-6">
            {favorites.map((city) => (
                <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
                >
                    {city}
                </button>
                
            ))}
        </div>
    )
}