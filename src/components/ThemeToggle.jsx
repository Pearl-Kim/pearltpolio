import useThemStore from "../store/themsStore";


export default function ThemeToggle() {
    const { color, setColor } = useThemStore();

    const colors = ['primary', 'sunny', 'cloudy', 'rainy'];

    return (
        <div className="flex gap-2 justify-center mt-4">
            {colors.map((c) => {
                <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={
                        `w-8 h-8 rounded-full bg-${c} border-2 border-white shadow-md 
                        ${color === c ? "ring-2 ring-offset-2 ring-" + c : "" }`}
                ></button>
            })}
        </div>
    )
}