import { Button } from "@chakra-ui/react";
import { useConnect, useAccount, useBalance, useNetwork } from "wagmi";
import { Text, Tooltip, Container, Flex } from "@chakra-ui/react";
import { formatConnectedWallet } from "../../helper/helper";
import { Box } from "@chakra-ui/react";

export function ConnectButton({ title }) {
  const [{ data, error }, connect] = useConnect();
  const [{ data: networkData }] = useNetwork();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData ? accountData.address : null,
  });

  if (accountData?.address && networkData) {
    return (
      <Flex borderRadius={50} pr={2}>
        <Container
          bg="brand.orange_main"
          borderRadius={50}
          opacity={0.9}
          mr={3}
        >
          {balanceData ? Number(balanceData.formatted).toFixed(4) : null}{" "}
          {balanceData ? balanceData.symbol : null}
        </Container>

        <Text>{formatConnectedWallet(accountData?.address)}</Text>
        <Box
          ml={1}
          as="span"
          color={networkData.chain.name === "Mainnet" ? "green" : "red"}
          fontSize="lg"
        >
          <Tooltip
            label={
              networkData.chain.name === "Mainnet"
                ? `Connected to ${networkData.chain.name}`
                : `${networkData.chain.name} is not supported`
            }
            aria-label="Connected"
          >
            ●
          </Tooltip>
        </Box>
      </Flex>
    );
  }

  return (
    <Container>
      {data.connectors.map((x) => (
        <Button
          boxShadow="md"
          variant="outline"
          key={x.id}
          onClick={() => connect(x)}
        >
          {title}
        </Button>
      ))}

      {error && (
        <Text fontSize="xs">{error?.message ?? "Failed to connect"}</Text>
      )}
    </Container>
  );
}
