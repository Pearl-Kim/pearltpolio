import { 
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
 } from "recharts";
import useWeatherStore from "../store/weatherSore";


export default function ForecastChart() {
    const { forecastData } = useWeatherStore();

    if(!forecastData) return null;

    const data = forecastData.filter((_, i) => i % 4 === 0).map((item) => ({
        time: item.dt_txt.slice(5, 16), //"MM-DD HH:mm" 형식으로 잘라서 X축 라벨로 사용
        temp: Math.round(item.main.temp), //소수점 반올림
    }));

    return (
        <div className="mt-10 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">5일간 기후 변화표</h3>
            <ResponsiveContainer width="100%" height={300}>
                {/* {화면 크기에 맞게 자동 리사이즈} */}
                <LineChart data={data}>
                    
                    <CartesianGrid strokeDasharray="3 3" /> {/* {자동 격자선} */}
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} /> {/* {x축 날짜, 시간} */}
                    <YAxis unit="°C" domain={["auto", "auto"]} /> {/* {y축 온도} */}
                    <Tooltip />{/* {마우스 오버시 툴팁} */}
                    <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="#dddddd"
                        strokeWidth={3}
                        dot={{ r: 3}} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}