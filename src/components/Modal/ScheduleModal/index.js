import styled from "@emotion/styled";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import EmptyStateGif from "../../../assets/gifs/empty-state.gif";
import WarningGif from "../../../assets/gifs/warning.gif";

export const EmptyState = ({ onOpen, route, title, text, btnText }) => {

  const {pathname} = useLocation()

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${route}`);
  };

  return (
    <Center flexDirection="column">
      <EmptyStateGifImg src={EmptyStateGif} alt="Empty State Gif" />

      <EmptyStateHeaderText>
        Oops! {title}.
      </EmptyStateHeaderText>

      <EmptyStateBodyText>
        {text}.
      </EmptyStateBodyText>

      <Button
        w="210px"
        h="44px"
        border=" 1px solid #F99B28"
        borderRadius="2px"
        onClick={pathname.includes("/dashboard/vendor/program-schedule") ? onOpen : navigateHandler}
      >
        <EmptyStateButtonText>{btnText}</EmptyStateButtonText>
      </Button>
    </Center>
  );
};
export const ScheduleModal = ({
  isOpen,
  onClose,
  handleSubmit,
  handleChange,
  values,
  loading,
  buttonText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ sm: "md", lg: "4xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ScheduleContainer onSubmit={handleSubmit}>
            <section className="schedule-input">
              <div>
                <label>Show Title</label>
                <input
                  type="text"
                  placeholder="Enter the show title"
                  onChange={handleChange}
                  value={values.show}
                  name="show"
                  required
                />
              </div>
              <div>
                <label>Sponsor:</label>
                <input
                  type="text"
                  placeholder="Enter sponsors name"
                  onChange={handleChange}
                  value={values.sponsor}
                  name="sponsor"
                  required
                />
              </div>
            </section>
            <Flex
              justifyContent="space-between"
              flexDir={{ sm: "column", lg: "row" }}
            >
              <Select
                size="lg"
                w="150px"
                border="0.8px solid #ABA8A8"
                onChange={handleChange}
                value={values.status}
                name="status"
                mb={{ sm: "31px", lg: "0px" }}
              >
                <option>Available</option>
                <option>Not Available</option>
              </Select>
              <section className="schedule-time-wrapper">
                <div className="schedule-time-dropdown">
                  <label>from</label>
                  <input
                    type="time"
                    value={values.startTime}
                    name="startTime"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="schedule-time-dropdown">
                  <label>to</label>
                  <input
                    type="time"
                    required
                    value={values.endTime}
                    onChange={handleChange}
                    name="endTime"
                  />
                </div>
              </section>
            </Flex>
            <div className="add-btn">
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Submitting"
                mb={{ sm: "41px", lg: "0px" }}
              >
                {buttonText}
              </Button>
            </div>
          </ScheduleContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const DeleteModal = ({
  isOpen,
  onClose,
  handleDelete,
  deleteProgLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" justify="center" p="64px 0px ">
            <Center flexDir="column" mb="49px">
              <WarningGifImg src={WarningGif} alt="Warning Gif" />

              <DeleteHeaderText>Delete Schedule?</DeleteHeaderText>

              <DeleteBodyText>
                Are you sure you want to delete this schedule? This action
                cannot be undone.
              </DeleteBodyText>
            </Center>
            <Flex justify="space-between">
              <Button border="1px solid #F99B28" borderRadius="2px" bg="white">
                <DeleteSecondaryButtonText onClick={onClose}>
                  No, Cancel
                </DeleteSecondaryButtonText>
              </Button>

              <Button
                bg="#F99B28"
                borderRadius="2px"
                isLoading={deleteProgLoading}
                onClick={handleDelete}
                loadingText="Deleting"
              >
                <DeletePrimaryButtonText>Yes, Delete</DeletePrimaryButtonText>
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const EmptyStateGifImg = styled.img`
  width: 210px;
  height: 210px;
`;

const EmptyStateHeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #004643;
  margin: 50px 0px 15px 0px;
`;

const EmptyStateBodyText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #004643;
  margin-bottom: 40px;
`;

const EmptyStateButtonText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #004643;
`;

const ScheduleContainer = styled.form`
  min-height: 459px;
  background: #ffffff;
`;

const DeleteHeaderText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #004643;
  margin-top: 16px;
`;

const DeleteBodyText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #004643;
  margin-top: 16px;
`;

const DeletePrimaryButtonText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #ffffff;
`;

const DeleteSecondaryButtonText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #004643;
`;

const WarningGifImg = styled.img`
  width: 121px;
  height: 121px;
`;
