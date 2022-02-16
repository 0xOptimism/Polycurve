import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    brand: {
      orange_main: "#ff6347",
      error: "#ff0033",
    },
  },
});

export default theme;
