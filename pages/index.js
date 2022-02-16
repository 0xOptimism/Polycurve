import { useState, useEffect } from "react";
import { Flex, Container, VStack, Box } from "@chakra-ui/react";

import useErrorStore from "../store/useErrorStore";
import NavBar from "../views/Navbar";
import { GridComponent } from "../components/Grid/GridComponent";
import AccordionComponent from "../components/Accordion/AccordionComponent";
import AlertComponent from "../components/Alert/Alert";

export default function Home() {
  const error = useErrorStore((state) => state.error);
  const setError = useErrorStore((state) => state.setError);
  const errorMessage = useErrorStore((state) => state.errorMessage);
  const [time, setTime] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setTime(true);
        setError(false);
      }, 5000);
    }
  }, [error, setError]);

  return (
    <Container maxWidth="container.xl" padding={0}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <NavBar />
          {error && time ? (
            <AlertComponent
              alertTitle={errorMessage.title}
              alertDescription={errorMessage.description}
              onClick={() => setError(!error)}
            />
          ) : null}
        </Box>
        <Box mt={50}>
          <Flex
            h="80vh"
            py={[0, 10, 20]}
            direction={{ base: "column-reverse", md: "row" }}
          >
            <GridComponent />
          </Flex>
        </Box>
      </VStack>
      {/* <Flex py={[0, 10, 20]} direction={{ base: "column-reverse" }}>
        <AccordionComponent />
      </Flex> */}
    </Container>
  );
}
