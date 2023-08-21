import { useQuery, useMutation } from "@apollo/client";
import { Button, Grid, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  InputGridItem,
  SelectFieldBanks,
  HeaderText,
  SubText,
  UpdateDetailsText,
} from "..";
import { SAVE_BROADCASTER_BANK_ACCOUNT } from "../../../../components/GraphQL/Mutation";
import { GET_BROADCASTER_ACCOUNT_INFORMATION } from "../../../../components/GraphQL/Queries";
import { updateAccountSchema } from "../../../../utils/validations";

export const BankDetails = () => {
  const {
    data: {
      broadcaster: {
        getBroadcasterAccountInformation: {
          accountName = "",
          accountNumber = "",
          bankCode = "",
          bankName = "",
        } = {},
      } = {},
    } = {},
  } = useQuery(GET_BROADCASTER_ACCOUNT_INFORMATION);
  const [saveBroadcasterBankAccount, { loading }] = useMutation(
    SAVE_BROADCASTER_BANK_ACCOUNT,
    {
      onCompleted: () =>
        toast({
          title: "Bank details updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        }),
      onError: ({ networkError }) => {
        toast({
          title: "Bank details update Error",
          description: networkError?.result?.errors[0]?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
      refetchQueries: [
        { query: GET_BROADCASTER_ACCOUNT_INFORMATION },
        "GetBroadcasterAccountInformation",
      ],
    }
  );
  const toast = useToast();

  const { handleSubmit, values, handleChange, errors, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        accountName,
        accountNumber,
        bankCode,
        bankName,
      },
      validationSchema: updateAccountSchema,
      onSubmit: ({ accountName, accountNumber, bankCode, bankName }) => {
        saveBroadcasterBankAccount({
          variables: {
            input: { bankCode, accountName, accountNumber, bankName },
          },
        });
      },
    });
  return (
    <>
      <HeaderText style={{ marginBottom: "31px" }}>Bank details</HeaderText>
      <SubText>
        Please update your bank account information. You cannot undo this
        action, so make sure you verify the information.
      </SubText>
      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap="35px"
          w="100%"
        >
          <SelectFieldBanks
            label="Bank Name"
            placeholder=""
            name="bankCode"
            value={values.bankCode}
            handleChange={handleChange}
            error={errors.bankCode}
            setFieldValue={setFieldValue}
          />
          <InputGridItem
            label="Account Name"
            placeholder=""
            name="accountName"
            value={values.accountName}
            handleChange={handleChange}
            error={errors.accountName}
          />

          <InputGridItem
            label="Account Number"
            placeholder=""
            name="accountNumber"
            value={values.accountNumber}
            handleChange={handleChange}
            error={errors.accountNumber}
          />

          <Button
            w="152px"
            h="44px"
            border="1px solid #f99b28"
            borderRadius="2px"
            bg="white"
            isLoading={loading}
            type="submit"
          >
            <UpdateDetailsText>Update details</UpdateDetailsText>
          </Button>
        </Grid>
      </form>
    </>
  );
};
