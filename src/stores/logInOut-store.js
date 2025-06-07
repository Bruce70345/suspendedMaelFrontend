import { create } from "zustand";


const useLoggedInStore = create(
    (set) => ({
        isLoggedIn: false,
        logIn: () => set({ isLoggedIn: true }),
        logOut: () => set({ isLoggedIn: false }),
    }));

export default useLoggedInStore;

