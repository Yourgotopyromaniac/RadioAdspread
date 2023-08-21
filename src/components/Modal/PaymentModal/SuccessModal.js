import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
} from "@chakra-ui/react";
import SuccessPopup from "../../../assets/gifs/success-popup.gif";

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <ModalBody
            pb={6}
            w="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Box w={200} h={200} margin="0 auto">
              <Image src={SuccessPopup} alt="success-popup" w="100%" />
            </Box>
            <Stack spacing={5}>
              <Text textAlign="center" as="b" fontSize="16px">
                Campaign Successfully Created!
              </Text>
              <Text textAlign="center" fontSize="14px">
                T
                <span style={{ textTransform: "lowercase" }}>
                  o confirm your order status, please check your dashboard.
                </span>
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="#F99B28;"
              maxW="250px"
              padding="19px 60px"
              margin="0 auto"
              borderRadius="2px"
              onClick={() => navigate("/dashboard/station")}
            >
              View Campaigns
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessModal;
