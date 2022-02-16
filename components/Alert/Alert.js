import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

export default function AlertComponent({
  alertTitle,
  alertDescription,
  onClick,
}) {
  return (
    <Box w="30%">
      <Alert
        position="absolute"
        left={0}
        right={0}
        m="auto"
        w="inherit"
        status="error"
      >
        <AlertIcon />
        <AlertTitle mr={2}>{alertTitle}</AlertTitle>
        <AlertDescription>{alertDescription}</AlertDescription>
        <CloseButton
          onClick={onClick}
          position="absolute"
          right="8px"
          top="8px"
        />
      </Alert>
    </Box>
  );
}
