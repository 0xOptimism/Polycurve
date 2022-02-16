import { Heading } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

export function Title() {
  return (
    <Stack direction={["column"]} spacing="5px">
      <Center>
        <Heading>Polycurve</Heading>
      </Center>
      <Center>
        <Heading color="brand.orange_main" size="xs" fontWeight={300}>
          Minimalist NFT Shapes randomly generated
        </Heading>
      </Center>
    </Stack>
  );
}
