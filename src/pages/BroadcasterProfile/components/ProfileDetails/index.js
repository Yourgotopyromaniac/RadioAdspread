import { Grid, Button, Center, useToast } from "@chakra-ui/react";
import { HeaderText, SubText, InputGridItem, SelectField } from "..";
import { useFormik } from "formik";
import { GET_BROADCASTER_PROFILE } from "../../../../components/GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { fileAtom } from "../../../../atom/fileAtom";
import { updateProfileSchema } from "../../../../utils/validations";
import { UPDATE_BROADCASTER_PROFILE } from "../../../../components/GraphQL/Mutation";

export const ProfileDetails = () => {
  const toast = useToast();
  const [file, setFile] = useAtom(fileAtom);
  const [updateProfile, { loading }] = useMutation(UPDATE_BROADCASTER_PROFILE, {
    refetchQueries: [
      { query: GET_BROADCASTER_PROFILE },
      "GetBroadcasterProfile",
    ],
  });
  const {
    data: {
      broadcaster: {
        getBroadcasterProfile: {
          name = "",
          fullname = "",
          email = "",
          country = "",
          city = "",
          address = "",
          radioStationWebsite = "",
          radioStationDigitalStreaUrl = "",
          radioStationCategory = "",
          phoneNumber = "",
          zipcode = "",
        } = {},
      } = {},
    } = {},
  } = useQuery(GET_BROADCASTER_PROFILE);
  const { handleSubmit, values, handleChange, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber,
      radioStationDigitalStreaUrl,
      radioStationCategory,
      radioStationWebsite,
      zipcode,
      city,
      country,
      address,
      fullname,
      email,
      name,
    },
    onSubmit: (data) => {
      const mutatedData = file ? { ...data, banner: file } : data;
      updateProfile({
        variables: {
          input: { ...mutatedData },
        },

        onCompleted: () => {
          toast({
            title: "Profile Updated.",
            description: "We've updated your profile for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        onError({ networkError }) {
          toast({
            title: "Profile Update Error.",
            description: networkError.result.errors[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      });
      setFile(null);
    },
    validationSchema: updateProfileSchema,
  });

  return (
    <>
      <HeaderText style={{ marginBottom: "31px" }}>Profile details</HeaderText>
      <SubText>
        Your first name, last name and address details will be used for creating
        an invoice.
      </SubText>

      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)" }}
          gap="35px"
          maxW="1002px"
          my="35px"
        >
          <InputGridItem
            label="Full name"
            placeholder="Agnes"
            name="fullname"
            value={values.fullname}
            handleChange={handleChange}
            error={errors.fullname}
          />
        </Grid>
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap="35px"
          maxW="1002px"
        >
          <SelectField
            label="Country"
            placeholder="Nigeria"
            name="country"
            value={values.country}
            handleChange={handleChange}
            error={errors.country}
          />
          <InputGridItem
            label="City"
            placeholder="Lagos"
            name="city"
            value={values.city}
            handleChange={handleChange}
            error={errors.city}
          />
          <InputGridItem
            label="Address"
            placeholder="2B Montgomery Yaba"
            name="address"
            value={values.address}
            handleChange={handleChange}
            error={errors.address}
          />
          <InputGridItem
            label="Postal code"
            placeholder="102929"
            name="zipcode"
            value={values.zipcode}
            handleChange={handleChange}
            error={errors.zipcode}
          />
          <InputGridItem
            label="Name of Radio Station"
            placeholder="Beat FM"
            name="name"
            value={values.name}
            handleChange={handleChange}
            error={errors.name}
          />
          <InputGridItem
            label="Radio Station Digital Stream URL"
            placeholder="Https://"
            name="radioStationDigitalStreaUrl"
            value={values.radioStationDigitalStreaUrl}
            handleChange={handleChange}
            error={errors.radioStationDigitalStreaUrl}
          />
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
            gap="35px"
            w="100%"
          >
            <InputGridItem
              label="Radio Station Website"
              placeholder="Https://"
              name="radioStationWebsite"
              value={values.radioStationWebsite}
              handleChange={handleChange}
              error={errors.radioStationWebsite}
            />
            <InputGridItem
              label="Radio Station Category"
              placeholder="Entertainment"
              name="radioStationCategory"
              value={values.radioStationCategory}
              handleChange={handleChange}
              error={errors.radioStationCategory}
            />
          </Grid>

          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
            gap="35px"
            w="100%"
          >
            <InputGridItem
              label="Phone Number"
              placeholder="+234"
              name="phoneNumber"
              value={values.phoneNumber}
              handleChange={handleChange}
              error={errors.phoneNumber}
            />
            <InputGridItem
              label="Email Address"
              placeholder="Enter your email address"
              name="email"
              value={values.email}
              handleChange={handleChange}
              error={errors.email}
            />
          </Grid>
        </Grid>
        <Center mt="50px">
          <Button type="submit" isLoading={loading} loadingText="Updating ...">
            Update
          </Button>
        </Center>
      </form>
    </>
  );
};
