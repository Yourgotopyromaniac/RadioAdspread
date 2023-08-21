import { Center, Spinner } from "@chakra-ui/react";
export const TableSpinner = () => {
  return (
    <Center h={200} w="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#004643"
        size="xl"
      />
    </Center>
  );
};
