import { gql } from "@apollo/client";

export const BROADCASTER_WITHDRAW = gql`
  mutation BroadcasterWithdraw($input: broadcasterWithdrawInput) {
    broadcaster {
      broadcasterWithdraw(input: $input)
    }
  }
`;

export const SAVE_BROADCASTER_BANK_ACCOUNT = gql`
  mutation SaveBroadcasterBankAccount(
    $input: saveBroadcasterBankAccountInputForBroadcaster
  ) {
    broadcaster {
      saveBroadcasterBankAccount(input: $input) {
        bankCode
        accountNumber
        accountName
        bankName
      }
    }
  }
`;

export const UPDATE_BROADCASTER_PROFILE = gql`
  mutation UpdateBroadcasterProfile($input: updateBroadcasterProfileInput) {
    broadcaster {
      updateBroadcasterProfile(input: $input) {
        broadcaster {
          email
          name
          fullname
          positionHeld
          address
          country
          state
          city
          zipcode
          radioStationWebsite
          radioStationCategory
          radioStationDigitalStreaUrl
          phoneNumber
          banner
          tagLine
        }
      }
    }
  }
`;

export const CREATE_VOLUME_DISCOUNT = gql`
  mutation CreateVolumeDiscount($input: createVolumeDiscountInput) {
    broadcaster {
      createVolumeDiscount(input: $input) {
        id
        userId
        discount
        fromSpot
        toSpot
      }
    }
  }
`;
export const UPDATE_CAMPAIGN_STATUS = gql`
  mutation UpdateCampaignStatus(
    $campaignId: ID!
    $campaignStatus: BookingStatus!
  ) {
    broadcaster {
      updateCampaignStatus(
        campaignId: $campaignId
        campaignStatus: $campaignStatus
      ) {
        message
      }
    }
  }
`;
export const ADVERTISER_REGISTER = gql`
  mutation AdvertiserRegister($input: AdvertiserRegisterInput) {
    auth {
      advertiserRegister(input: $input) {
        token
        expires
        issued
        isVerified
        group
      }
    }
  }
`;

export const ADVERTISER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    auth {
      login(input: { email: $email, password: $password }) {
        token
        isVerified
        group
      }
    }
  }
`;

export const ADD_PROGRAMME_SCHEDULE = gql`
  mutation AddProgramSchedule($input: AddProgramScheduleInput) {
    broadcaster {
      addProgramSchedule(input: $input) {
        weekDay
        status
        startTime
        sponsor
        show
        id
        endTime
      }
    }
  }
`;

export const UPDATE_PROGRAMME_SCHEDULE = gql`
  mutation UpdateProgramSchedule($input: UpdateProgramScheduleInput) {
    broadcaster {
      updateProgramSchedule(input: $input) {
        id
        startTime
        endTime
        show
        sponsor
        status
        weekDay
      }
    }
  }
`;

export const DELETE_PROGRAMME_SCHEDULE = gql`
  mutation DeleteProgramSchedule($deleteProgramScheduleId: ID!) {
    broadcaster {
      deleteProgramSchedule(id: $deleteProgramScheduleId)
    }
  }
`;

export const BROADCASTER_REGISTER = gql`
  mutation BroadcasterRegister(
    $zipcode: String!
    $state: String!
    $radioStationWebsite: String!
    $radioStationDigitalStreaUrl: String!
    $radioStationCategory: String!
    $positionHeld: String!
    $phoneNumber: String!
    $password: String!
    $name: String!
    $fullname: String!
    $email: String!
    $country: String!
    $confirmPassword: String!
    $city: String!
    $address: String!
  ) {
    auth {
      broadcasterRegister(
        input: {
          zipcode: $zipcode
          state: $state
          radioStationWebsite: $radioStationWebsite
          radioStationDigitalStreaUrl: $radioStationDigitalStreaUrl
          radioStationCategory: $radioStationCategory
          positionHeld: $positionHeld
          phoneNumber: $phoneNumber
          password: $password
          name: $name
          fullname: $fullname
          email: $email
          country: $country
          confirmPassword: $confirmPassword
          city: $city
          address: $address
        }
      ) {
        token
      }
    }
  }
`;

export const OTP_CONFIRMATION = gql`
  mutation VerifyEmail($verificationCode: String!) {
    auth {
      verifyEmail(verificationCode: $verificationCode) {
        token
        expires
        issued
        isVerified
        group
      }
    }
  }
`;
export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($input: createCampaignInput) {
    advertiser {
      createCampaign(input: $input) {
        ... on PayFromWallet {
          paymentMethod
          result
        }
        ... on PayFromPaystack {
          paymentMethod
          authorizationUrl
          transactionId
        }
        ... on PayFromEnd2End {
          paymentMethod
          apiKey
          accessKey
          amount
          currency
          userEmail
          callbackUrl
          referenceId
        }
      }
    }
  }
`;

export const DASHBOARD_DATA = gql`
  query GetDashboardData {
    advertiser {
      getDashboardData {
        activeCampaign
        pendingCampaign
        totalCampaign
        recentCampaigns {
          campaignStatus
          campaignDetails
          id
        }
      }
    }
  }
`;

export const BOOK_SLOTS = gql`
  mutation BookSlots($input: [bookSlotsInput]) {
    advertiser {
      bookSlots(input: $input)
    }
  }
`;

export const UPDATE_BROADCASTER_SLOT = gql`
  mutation BatchUpdateSlot($input: [UpdateSlotInput]) {
    broadcaster {
      batchUpdateSlot(input: $input) {
        updateCount
        message
      }
    }
  }
`;

export const CREATE_DRAFTS = gql`
  mutation CreateDraft($input: [createDraftInput]) {
    advertiser {
      createDraft(input: $input) {
        id
        summary {
          vat
          subTotal
          totalDiscountApplied
          grandTotal
          campaignSummary {
            id
            name
            price
            banner
          }
        }
      }
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword(
    $currentPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    advertiser {
      updatePassword(
        input: {
          currentPassword: $currentPassword
          newPassword: $newPassword
          confirmNewPassword: $confirmNewPassword
        }
      )
    }
  }
`;

export const SEND_EXPERT_EMAIL = gql`
  mutation SendExpertEmail($input: sendExpertEmailInput) {
    guest {
      sendExpertEmail(input: $input)
    }
  }
`;
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput) {
    auth {
      forgotPassword(input: $input) {
        message
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput) {
    auth {
      resetPassword(input: $input) {
        message
      }
    }
  }
`;

export const PAY_FOR_CAMPAIGN_FROM_PAYSTACK = gql`
  mutation PayForCampaignFromPaystack($input: payForCampaignFromPaystackInput) {
    advertiser {
      payForCampaignFromPaystack(input: $input) {
        status
        message
      }
    }
  }
`;

export const REFRESH_TRANSACTION = gql`
  mutation RefreshTransaction($transactionId: ID!) {
    advertiser {
      refreshTransaction(transactionId: $transactionId) {
        status
        message
      }
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio($input: createPortfolioInput) {
    advertiser {
      createPortfolio(input: $input)
    }
  }
`;

export const ENABLE_ANALYTICS = gql`
  mutation EnableAnalytics($camapignId: ID!, $protfolioId: ID!) {
    advertiser {
      enableAnalytics(camapignId: $camapignId, protfolioId: $protfolioId)
    }
  }
`;

export const VERIFY_BROADCASTER_EMAIL = gql`
mutation VerifyBroadcasterEmail($verifyBroadcasterEmailId: ID!) {
  admin {
    verifyBroadcasterEmail(id: $verifyBroadcasterEmailId)
  }
}
`

export const APPROVE_BROADCASTER_EMAIL = gql`
  mutation ApproveBroadcaster($approveBroadcasterId: ID!) {
  admin {
    approveBroadcaster(id: $approveBroadcasterId)
  }
}
`


