import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";


export  const createCounterStore = (
    initState = {count:0}
) => {
    return createStore((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
    }))
}

