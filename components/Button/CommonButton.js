import { Button } from "@chakra-ui/react";

export const CommonButton = ({
  title,
  onClick,
  colorScheme,
  hover,
  variant,
  disabled = true,
  mb,
  borderColor,
  boxShadow,
}) => {
  return (
    <Button
      mb={mb}
      onClick={onClick}
      disabled={disabled}
      colorScheme={colorScheme}
      _hover={hover}
      borderColor={borderColor}
      variant={variant}
      w={20}
      boxShadow={boxShadow}
    >
      {title}
    </Button>
  );
};
