import {
  GridItem,
  Input,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Select,
  HStack,
} from "@chakra-ui/react";
import ngBanks from "ng-banks";
import { getNames } from "country-list";
import { useMemo } from "react";
import styled from "styled-components";

export const InputGridItem = ({
  placeholder,
  label,
  isRequired = false,
  name,
  value,
  handleChange,
  error,
  isDisabled = false,
}) => {
  return (
    <GridItem w="100%" h="10">
      <FormControl
        variant="floating"
        name={name}
        isRequired={isRequired}
        isInvalid={error}
      >
        <FormLabel>
          <LabelText>{label}</LabelText>
        </FormLabel>

        <Input
          placeholder={placeholder}
          isDisabled={isDisabled}
          _placeholder={{
            opacity: 1,
            color: " #7a7979",
            fontSize: "12px",
            letterSpacing: "0.02em",
            fontWeight: "400px",
          }}
          name={name}
          style={{
            opacity: 1,
            color: " #7a7979",
            fontSize: "12px",
            letterSpacing: "0.02em",
            fontWeight: "400px",
          }}
          value={value}
          onChange={handleChange}
          type="text"
        />

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </GridItem>
  );
};

export const SelectField = ({
  label,
  placeholder,
  isRequired = false,
  name,
  value,
  handleChange,
  error,
}) => {
  const options = useMemo(() => getNames(), []);
  return (
    <GridItem w="100%" h="10">
      <FormControl
        variant="floating"
        name={name}
        isRequired={isRequired}
        isInvalid={error}
      >
        <FormLabel>
          <LabelText>{label}</LabelText>
        </FormLabel>
        <Select
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          name={name}
          style={{
            opacity: 1,
            color: " #7a7979",
            fontSize: "12px",
            letterSpacing: "0.02em",
            fontWeight: "400px",
          }}
        >
          {options.map((country) => (
            <option value={country}>{country}</option>
          ))}
        </Select>
        <FormErrorMessage
          style={{
            opacity: 1,
            fontSize: "12px",
            letterSpacing: "0.02em",
            fontWeight: "400px",
          }}
        >
          {error}
        </FormErrorMessage>
      </FormControl>
    </GridItem>
  );
};
export const SelectFieldBanks = ({
  label,
  placeholder,
  isRequired = false,
  name,
  value,
  handleChange,
  error,
  setFieldValue,
}) => {
  const banks = useMemo(() => ngBanks.getBanks(), []);

  return (
    <GridItem w="100%" h="10">
      <HStack>
        <FormControl
          variant="floating"
          name={name}
          isRequired={isRequired}
          isInvalid={error}
        >
          <FormLabel>
            <LabelText>{label}</LabelText>
          </FormLabel>
          <Select
            placeholder={placeholder}
            onChange={(e) => {
              const currentBank = ngBanks.getBank(e.target.value);
              setFieldValue("bankName", currentBank.name);
              handleChange(e);
            }}
            value={value}
            name={name}
            style={{
              opacity: 1,
              color: " #7a7979",
              fontSize: "12px",
              letterSpacing: "0.02em",
              fontWeight: "400px",
            }}
          >
            {banks.map((bank) => (
              <option value={bank.code} key={bank.code}>
                {bank.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage
            style={{
              opacity: 1,
              fontSize: "12px",
              letterSpacing: "0.02em",
              fontWeight: "400px",
            }}
          >
            {error}
          </FormErrorMessage>
        </FormControl>
      </HStack>
    </GridItem>
  );
};
export const HeaderText = styled.h1`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #004643;
`;
export const EditPhotoText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;

  color: #7a7979;
`;
export const SubText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: #7a7979;
  margin-bottom: 36px;
`;
export const LabelText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #004643;
`;

export const UpdateDetailsText = styled.p`
  font-family: "Adobe Clean";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */
  color: #004643;
`;
