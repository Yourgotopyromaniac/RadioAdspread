import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import LogoutImg from "./logoutImg.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { handleLogOut } from "../../../pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/utils";

const Logout = ({ isOpen, onClose }) => {

  const navigate = useNavigate()

  return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent padding="20px">
          <ModalHeader margin="0 auto">
            <img src={LogoutImg} alt="logout" />
          </ModalHeader>
          <ModalBody>
            <Text
              textAlign="center"
              fontSize="20px"
              fontWeight="400"
              lineHeight="40px"
              color="#0F3433"
              whiteSpace="nowrap"
            >
              Are you sure you want to logout?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleLogOut(navigate)}>Yes, Logout</Button>
            <Button onClick={onClose} style={{color: "#000"}}>No, Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default Logout;

const Button = styled.button`
  // background: transparent;
  color: #c52d2f;
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 10px 30px;
  &:hover {
    background: #f99b28;
    color: #fff !important;
    border-radius: 2px 2px 0px 0px;
  }
`;
