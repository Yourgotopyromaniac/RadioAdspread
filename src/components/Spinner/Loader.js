import { Center, Spinner } from "@chakra-ui/react";
import "./css/style.css";
export const Loader = () => {
  return (
    <div className="wrapper">
      <div className="wrapper_body">
        <Center h="100vh" w="100%">
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#004643"
            size="xl"
          />
        </Center>
      </div>
    </div>
  );
};
