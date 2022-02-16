import create from "zustand";

const useErrorStore = create((set) => ({
  error: false,
  errorMessage: "Error",
  setError: (bool) => set(() => ({ error: bool })),
  setErrorMessage: (message) => set(() => ({ errorMessage: message })),
}));

export default useErrorStore;
