import { VStack, Center } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";

const UploadFile = ({
  uploadText = "",
  fileFormat = "",
  onDrop,
  fileType,
  file,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { ...fileType },
  });
  return (
    <VStack alignItems="flex-start" maxW="500px" w="100%">
      <UploadText>Upload {uploadText}</UploadText>

      <UploadContainer>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Center mb="26px">
            <FileIcon />
          </Center>
          <VStack spacing="4.5px">
            <UploadSubText>
              {file ? "File Dropped" : "Drag and Drop files here"}
            </UploadSubText>
            <BrowseFileText>Browse your computer</BrowseFileText>
            <FileFormatText>File Format:{fileFormat}</FileFormatText>
          </VStack>
        </div>
      </UploadContainer>
    </VStack>
  );
};

export default UploadFile;

export const UploadText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #004643;
`;

export const UploadContainer = styled.div`
  width: 100%;
  height: 141px;
  border: 0.8px dashed #aba8a8;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 19px 0px;
  cursor: pointer;
`;

export const UploadSubText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */

  text-align: center;

  color: #3b3950;
`;

export const BrowseFileText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  text-align: center;
  color: #f99b28;
`;

export const FileFormatText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #868686;
`;

export const FileIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke="#868686"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke="#868686"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 18V12"
        stroke="#868686"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 15H15"
        stroke="#868686"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
