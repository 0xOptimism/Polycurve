import { Title } from "../components/Title/Title";
import { ConnectButton } from "../components/Button/ConnectButton";
import { Flex, Box, Spacer, Center, Text, chakra } from "@chakra-ui/react";
import { useFeeData } from "wagmi";

export default function NavBar() {
  const [{ data: gasPrice, error, loading }] = useFeeData({
    formatUnits: "gwei",
  });

  const getGasPrice = () => {
    if (error) {
      return <Text>An Error has occured, please refresh...</Text>;
    }
    if (gasPrice) {
      return (
        <Text>
          Gas:{" "}
          <chakra.span color="brand.orange_main" fontWeight={600}>
            {Number(gasPrice.formatted.gasPrice).toFixed(2)}
          </chakra.span>{" "}
          Gwei
        </Text>
      );
    }
  };

  return (
    <Flex direction={["column-reverse", "row"]}>
      <Center fontSize="lg" fontWeight={400} p="4" align={"center"}>
        {getGasPrice()}
      </Center>
      <Spacer />
      <Box p="4">
        <Title />
      </Box>
      <Spacer />
      <Center p="4">
        <ConnectButton title={"connect wallet"} />
      </Center>
    </Flex>
  );
}
