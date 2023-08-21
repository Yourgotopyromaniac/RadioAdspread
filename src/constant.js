export const AUTH_TOKEN = "token";

export const registerOption = {
  name: { required: "Name is required" },
  fullname: { required: "Fullname is required" },
  positionHeld: { required: "specify position" },
  address: { required: "Address is required" },
  country: { required: "country is required" },
  state: { required: "state is required" },
  city: { required: "city is required" },
  zipcode: { required: "specify zipcode" },
  radioStationWebsite: { required: "Radio station website is required" },
  radioStationCategory: { required: "Radio station category is required" },
  radioStationDigitalStreaUrl: {
    required: "Radion state Digital Stream Url is reuired",
  },
  phoneNumber: {
    required: "PhoneNumber is required",
    minLength: {
      value: 8,
      message: "PhoneNumber must have at least 11 digits",
    },
  },
  email: { required: "Email is required" },
  username: { required: "Username is required" },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
  },
  confirmPassword: { required: "confirm password must match password" },
};

export const loginOption = {
  email: { required: "Email is required" },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
  },
};

export const AdvertTypeData = [
  {
    name: "Jingles",
    value: "Jingle",
    advertTypeDuration: [
      {
        dur: "15 Secs",
        val: "15Sec",
      },
      {
        dur: "30 Secs",
        val: "30Sec",
      },
      {
        dur: "45 Secs",
        val: "45Sec",
      },
      {
        dur: "60 Secs",
        val: "60Sec",
      },
    ],
  },
  {
    name: "Paid Announcements",
    value: "paidAdvertisements",
    advertTypeDuration: [
      {
        dur: "50 Words",
        val: "50Words",
      },
      {
        dur: "75 Words",
        val: "75Words",
      },
      {
        dur: "100 Words",
        val: "100Words",
      },
    ],
  },
];

export const JINGLE_FILE_TYPE = {
  "audio/mpeg": [],
  "audio/wav": [],
  "audio/aac": [],
};
export const PAID_ANNOUNCEMENT_FILE_TYPE = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "application/pdf": [],
  "text/plain": [],
};
export const APCON_CERT_FILE_TYPE = {
  "image/jpeg": [],
  "image/png": [],
  "application/pdf": [],
};
export const CAMPAIGN_FILE_TYPE = {
  "image/jpeg": [],
  "image/png": [],
  "application/pdf": [],
}
