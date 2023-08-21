import * as yup from "yup";
export const updateProfileSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+234\d{10}$/, "Phone number must be valid")
    .required("Phone Number is required"),
  country: yup.string().required("country is required"),
  address: yup.string().required("address is required"),
  zipcode: yup.string().required("Postal Code  is required"),
  radioStationWebsite: yup
    .string()
    .url("Must be a valid URL")
    .required("Radio Station Website is required"),
  radioStationDigitalStreaUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("Radio Station Digital Stream URL is required"),

  radioStationCategory: yup
    .string()
    .required("Radio Station Category is required"),
});

export const updateAccountSchema = yup.object({
  accountName: yup.string().required("Account name is required"),
  accountNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Account number must be valid")
    .required("Account Number is required"),
});

export const AdvertiserSignupSchema = yup.object().shape({
  companyName: yup.string().when("accountType", {
    is: (accountType) => accountType === "company",
    then: yup
      .string()
      .min(3, "Company name must be more than three characters long")
      .required("Company Name is required"),
    otherwise: yup.string(),
  }),
  fullname: yup
    .string()
    .min(3, "Full Name must be more than three characters long")
    .required("Full Name is required"),
  address: yup
    .string()
    .min(3, "Address must be more than three characters long")
    .required("Address is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+234\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Minimum of 8 characters password")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match password")
    .required("confirm password is required"),
});

export const BroadcasterSignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be more than three characters long")
    .required("Name is required"),
  fullname: yup
    .string()
    .min(3, "Full Name must be more than three characters long")
    .required("Full Name is required"),
  address: yup
    .string()
    .min(3, "Address must be more than three characters long")
    .required("Address is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\+234\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  radioStationWebsite: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Enter radio statio website"),
  password: yup
    .string()
    .min(8, "Minimum of 8 characters password")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match password")
    .required("confirm password is required"),
});

export const PortfolioSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be 3 characters at minimum")
    .required("Title is required"),
  propertyId: yup.string().required("Property ID is required"),
  metric: yup.string().required("metric is required"),
});
