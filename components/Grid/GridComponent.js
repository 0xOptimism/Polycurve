import { useState, useEffect } from "react";
import {
  Flex,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  chakra,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useConnect, useContract, useSigner } from "wagmi";
import { utils } from "ethers";
import { CommonButton } from "../Button/CommonButton";
import contractABI from "../../contractABI.json";
import useErrorStore from "../../store/useErrorStore";
import useWeb3Store from "../../store/useWeb3Store";
import { useCallback } from "react";

export const GridComponent = () => {
  const [numberOfTokenToMint, setNumberOfTokenToMint] = useState(1);
  const { setError, setErrorMessage } = useErrorStore();
  const {
    maxSupply,
    totalSupply,
    tokenPrice,
    setMaxSupply,
    setTotalSupply,
    setTokenPrice,
  } = useWeb3Store();

  const [{ data: connectedData }] = useConnect();
  const [{ data: dataSigner }] = useSigner();
  const contract = useContract({
    addressOrName: process.env.RIKEBY_CONTRACT_ADDRESS,
    contractInterface: contractABI,
    signerOrProvider: dataSigner,
  });

  const getContractPrice = useCallback(async () => {
    const tokenPrice = await contract.cost();
    const formatTokenPrice = utils.formatUnits(tokenPrice, "ether");
    return setTokenPrice(formatTokenPrice);
  }, [contract, setTokenPrice]);

  useEffect(() => {
    if (contract && dataSigner) {
      getContractPrice();
      return contract
        .maxSupply()
        .then((res) => setMaxSupply(res._hex))
        .then(
          contract
            .totalSupply()
            .then((response) => setTotalSupply(response._hex))
        );
    }
  }, [contract, dataSigner, getContractPrice, setMaxSupply, setTotalSupply]);

  const formatSupply = utils.formatUnits(totalSupply, "wei");
  const formatMaxSupply = utils.formatUnits(maxSupply, "wei");

  const isMintButtonDisabled =
    connectedData.connected && formatSupply >= formatMaxSupply;

  const mintContract = async () => {
    if (contract) {
      try {
        const numberOfToken = Number(numberOfTokenToMint) * 0.01;
        const options = {
          value: utils.parseUnits(numberOfToken.toString()),
        };
        const tx = await contract.mint(numberOfTokenToMint, options);
        await tx.wait();
        await contract
          .totalSupply()
          .then((response) => setTotalSupply(response._hex));
      } catch (error) {
        await setError(true);
        await setErrorMessage({
          title: error.code,
          description: error.message,
        });
      }
    }
  };

  return (
    <Flex
      h="80vh"
      w={["100%"]}
      py={[0, 10, 20]}
      alignItems={["center"]}
      direction={{ base: "column", md: "row" }}
    >
      <VStack w="100%" h="100%" spacing={4} alignItems="center">
        <Image
          boxSize="xl"
          src="https://i.pinimg.com/originals/97/e0/5f/97e05f8a5ace9f39b1d004d431f8a7b7.png"
          alt="NFT-image"
        />
        <Text
          fontWeight={600}
          fontSize="16px"
        >{`Minted: ${formatSupply}/${formatMaxSupply}`}</Text>
      </VStack>
      <VStack w="80%" h="80%" spacing={3} alignItems="center">
        <Heading as="h6" fontSize="40px">
          An Abstract Art Collection
        </Heading>
        <Text fontSize="20px">
          Polycurve is a collection of 500 different shapes randomly generated
          on the Ethereum blockchain. Each item is unique and can be used for
          anything, when you purchase a Polycurve you also have a commercial
          rights. The mint price is{" "}
          <chakra.span color="brand.orange_main" fontWeight={600}>
            {tokenPrice} ETH
          </chakra.span>{" "}
          and only 500 Polycurve NFTs will ever be available.
        </Text>
        <Text fontSize="20px">
          Polycurve is a collection of 500 different shapes randomly generated
          on the Ethereum blockchain. Each item is unique and can be used for
          anything, when you purchase a Polycurve you also have a commercial
          rights. The mint price is{" "}
          <chakra.span color="brand.orange_main" fontWeight={600}>
            {tokenPrice} ETH
          </chakra.span>{" "}
          and only 500 Polycurve NFTs will ever be available.
        </Text>
        <Flex>
          <Container justifyContent={"space-evenly"}>
            <VStack h="60%" w="90%">
              <NumberInput
                onChange={(valueString) => setNumberOfTokenToMint(valueString)}
                size="md"
                maxW={24}
                defaultValue={1}
                min={1}
                max={5}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <CommonButton
              onClick={() => mintContract()}
              title={"Mint"}
              colorScheme={"Tomatoe"}
              hover={{
                background: "white",
                color: "brand.orange_main",
              }}
              disabled={!isMintButtonDisabled}
              variant="outline"
              mb={5}
              borderColor={"brand.orange_main"}
              boxShadow={"md"}
            />
          </Container>
        </Flex>
      </VStack>
    </Flex>
  );
};
