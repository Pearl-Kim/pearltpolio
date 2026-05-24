//테마 색상

import { create } from "zustand";

const useThemStore = create((set) => ({

    // 테마
    color: "primary",
    setColor: (color) => set({ color }),

    // 현재 날씨 데이터
    weather: null,

    // 현재 날씨 저장 함수
    setWeather: (data) => set({ weather: data }),

}));

export default useThemStore;