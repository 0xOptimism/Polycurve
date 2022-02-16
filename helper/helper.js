export const formatConnectedWallet = (wallet) => {
  return wallet.replace(wallet.substring(5, 36), "...");
};
