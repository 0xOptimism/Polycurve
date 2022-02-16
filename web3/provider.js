import { providers } from "ethers";

export const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, process.env.RINKEBY_INFURA_ID);
