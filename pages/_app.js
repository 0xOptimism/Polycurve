import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { Provider } from "wagmi";
import { provider } from "../web3/provider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider autoConnect provider={provider}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
