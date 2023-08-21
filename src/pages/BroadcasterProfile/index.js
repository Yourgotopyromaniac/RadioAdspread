import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { Box, Button, Image, useToast } from "@chakra-ui/react";

import { useQuery } from "@apollo/client";
import { GET_BROADCASTER_PROFILE } from "../../components/GraphQL/Queries";

import VendorDashbaordLayout from "../ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";

import FallBackStationImage from "../../asset/img/fallback-station-img.jpeg";
import { useAtom } from "jotai";
import { fileAtom } from "../../atom/fileAtom";
import { EditPhotoText, HeaderText } from "./components";
import { ProfileDetails } from "./components/ProfileDetails";
import { BankDetails } from "./components/BankDetails";

const BroadcasterProfile = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    data: { broadcaster: { getBroadcasterProfile: { banner } = {} } = {} } = {},
  } = useQuery(GET_BROADCASTER_PROFILE);

  const [file, setFile] = useAtom(fileAtom);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles[0].size / 1024 / 1024 > 1
      ? toast({
          title: "File too Large",
          description: "FIle is too large. Maximum size is 1MB",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        })
      : setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <VendorDashbaordLayout>
      <Box m="45px 67px 164px 65px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <HeaderText>Profile</HeaderText>
          <Button
            color="#ff9b28"
            bg="transparent"
            textTransform="capitalize"
            _hover={{ backgroundColor: "#ff9b28", color: "#fff" }}
            onClick={() => navigate("/profile/vendor/reset-password")}
          >
            change password
          </Button>
        </Box>

        <Image
          w="140px"
          h="106px"
          src={banner ?? FallBackStationImage}
          alt="Radio Station Image"
          mt="36px"
          mb="50px"
        />

        <Button
          colorScheme="#F99B28"
          variant="outline"
          w="70px"
          h="20px"
          mt="15px"
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <EditPhotoText> Edit Photo</EditPhotoText>
          </div>
        </Button>
        <Box mb="55px" mt="10px">
          <EditPhotoText>
            {file ? "File Uploaded" : "Please Upload File"}
          </EditPhotoText>
        </Box>
        <ProfileDetails />
        <BankDetails />
      </Box>
    </VendorDashbaordLayout>
  );
};

export default BroadcasterProfile;
