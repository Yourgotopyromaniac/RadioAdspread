import { VStack } from "@chakra-ui/react";
import ApprovalGif from "../../../../../../assets/gifs/approval.gif";
import {
  Container,
  ApprovalGifImage,
  ImageContainer,
  HeaderText,
  BodyText,
} from "./components";

const NotVerified = () => {
  return (
    <Container>
      <VStack
        maxW={{ lg: "914px" }}
        h={{ md: "673px" }}
        bg="#ffffff"
        spacing={16}
        px={{ md: "98px" }}
      >
        <ImageContainer>
          <ApprovalGifImage src={ApprovalGif} alt="Approval Gif" />
        </ImageContainer>

        <HeaderText>Your Account is Under Review</HeaderText>

        <BodyText>
          Until the review is complete, you will not be able to receive campaign
          orders. This usually takes up to 24hrs and we will notify you by email
          once the review is complete.
        </BodyText>
      </VStack>
    </Container>
  );
};

export default NotVerified;
