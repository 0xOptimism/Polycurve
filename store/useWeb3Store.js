import create from "zustand";

const useWeb3Store = create((set) => ({
  maxSupply: 0,
  totalSupply: 0,
  tokenPrice: 0,
  setMaxSupply: (supply) => set(() => ({ maxSupply: supply })),
  setTotalSupply: (supply) => set(() => ({ totalSupply: supply })),
  setTokenPrice: (price) => set(() => ({ tokenPrice: price })),
}));

export default useWeb3Store;
