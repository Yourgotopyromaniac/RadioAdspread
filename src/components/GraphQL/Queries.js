import { gql } from "@apollo/client";
import { gql as gqlreq } from "graphql-request";

export const GET_BROADCASTER_PROFILE = gql`
  query GetBroadcasterProfile {
    broadcaster {
      getBroadcasterProfile {
        tagLine
        banner
        phoneNumber
        radioStationDigitalStreaUrl
        radioStationCategory
        radioStationWebsite
        zipcode
        city
        state
        country
        address
        positionHeld
        fullname
        email
        name
      }
    }
  }
`;

export const BROADCASTER_SLOTS_GQL = gqlreq`
query GetBroadcasterSlots($broadcasterId: ID!) {
  guest {
    getBroadcasterSlots(broadcasterId: $broadcasterId) {
      startTime
      id
      endTime
      broadcasterId
      Jingle60SecPrice
      Jingle45SecPrice
      Jingle30SecPrice
      Jingle15SecPrice
      Ann75WordsPrice
      Ann50WordsPrice
      Ann100WordsPrice
    }
  }
}
`;

export const GET_DISCOUNT = gql`
  query GetDiscount {
    broadcaster {
      getDiscount {
        listOfDiscount {
          spot
          discount
        }
      }
    }
  }
`;

export const USER_INFO = gql`
  query Me {
    auth {
      me {
        name
        id
        group
        fullname
        email
        isApproved
      }
    }
  }
`;
export const GET_WALLET_BALANCE = gql`
  query GetWalletBalance {
    broadcaster {
      getWalletBalance {
        pendingBalance
        currentBalance
      }
    }
  }
`;
export const GET_BROADCASTER_ACCOUNT_INFORMATION = gql`
  query GetBroadcasterAccountInformation {
    broadcaster {
      getBroadcasterAccountInformation {
        bankCode
        accountNumber
        accountName
        bankName
      }
    }
  }
`;
export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory($page: Int!, $itemsPerPage: Int!) {
    broadcaster {
      getPaymentHistory(page: $page, itemsPerPage: $itemsPerPage) {
        transactions {
          id
          transactionDate
          amount
          paymentMethod
          status
        }
        totalCount
        page
        hasMore
      }
    }
  }
`;

export const GET_BROADCASTERS_REQ = gqlreq`
  query GetBroadcasters(
    $page: Int!
    $itemsPerPage: Int!
    $state: String
    $country: String
  ) {
    guest {
      getBroadcasters(
        page: $page
        itemsPerPage: $itemsPerPage
        state: $state
        country: $country
      ) {
        broadcasters {
          state
          startingPrice
          recommended
          name
          id
          country
          city
          banner
          isApproved
          tagLine
          discountedStatingPrice
        }
      }
    }
  }
`;

export const GET_BROADCASTERS = gql`
  query GetBroadcasters(
    $page: Int!
    $itemsPerPage: Int!
    $state: String
    $country: String
  ) {
    guest {
      getBroadcasters(
        page: $page
        itemsPerPage: $itemsPerPage
        state: $state
        country: $country
      ) {
        broadcasters {
          state
          startingPrice
          recommended
          name
          id
          country
          city
          banner
          isApproved
          tagLine
          discountedStatingPrice
          discountPercentage
        }
      }
    }
  }
`;

export const GET_CAMPAIGNNS = gql`
  query GetCampaigns {
    broadcaster {
      getCampaigns {
        id
        totalAmountSpent
        totalEarnings
        status
        date
      }
    }
  }
`;

export const GET_ALL_PROGRAM_SCHEDULE = gql`
  query GetAllProgramSchedule {
    broadcaster {
      getAllProgramSchedule {
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

export const WALLET_BALANCE = gql`
  query GetWalletBalance {
    advertiser {
      getWalletBalance {
        pendingBalance
        currentBalance
      }
    }
  }
`;
export const TRANSAACTION_HISTORY = gql`
  query GetTransactionHistory {
    advertiser {
      getTransactionHistory {
        type
        transactionId
        transactionDate
        paymentMethod
        id
        description
        amount
        status
      }
    }
  }
`;
export const GET_ADVERTISER_CAMPAIGNS = gql`
  query GetCampaigns {
    advertiser {
      getCampaigns {
        id
        date
        companyName
        campaignName
        industryName
        invoice
        radioStation {
          id
          name
        }
      }
    }
  }
`;

export const BROADCASTER_DASHBOARD_DATA = gql`
  query GetDashboardData {
    broadcaster {
      getDashboardData {
        activeCampaign
        pendingCampaign
        totalCampaign
        recentCampaigns {
          id
          campaignStatus
          campaignDetails
        }
      }
    }
  }
`;

export const BROADCASTER_SLOTS = gql`
  query GetBroadcasterSlots($broadcasterId: ID!) {
    guest {
      getBroadcasterSlots(broadcasterId: $broadcasterId) {
        startTime
        id
        endTime
        broadcasterId
        Jingle60SecPrice
        Jingle45SecPrice
        Jingle30SecPrice
        Jingle15SecPrice
        Ann75WordsPrice
        Ann50WordsPrice
        Ann100WordsPrice
      }
    }
  }
`;

export const BOOKING_STATS = gql`
  query GetBookingStats {
    advertiser {
      getBookingStats {
        totalNumberSlots
        totalNumberOfDays
        totalAmount
        numberOfradioStations
      }
    }
  }
`;

export const RESEND_VERIFICATION = gql`
  query GetResendVerification {
    auth {
      resendEmailVerificationCode
    }
  }
`;

export const ADVERTISER_DRAFTS = gql`
  query GetAllDraft {
    advertiser {
      getAllDraft {
        id
        date
        duration
        language
        slots
        subtotal
        type
        vendors
      }
    }
  }
`;

export const CAMPAIGN_SUMMARY = gql`
  query CampaignSummary {
    advertiser {
      getCampaignSummary {
        campaignSummary {
          id
          name
          price
        }
        grandTotal
        specialDiscount
        subTotal
        vat
      }
    }
  }
`;

export const TIME_SCHEDULE = gql`
  query GetBroadcasterTimeSchedule($broadcasterId: ID!) {
    guest {
      getBroadcasterTimeSchedule(broadcasterId: $broadcasterId) {
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

export const GET_ALLSLOT = gql`
  query GetAllSlot {
    broadcaster {
      getAllSlot {
        startTime
        id
        endTime
        broadcasterId
        Jingle60SecPrice
        Jingle45SecPrice
        Jingle30SecPrice
        Jingle15SecPrice
        Ann75WordsPrice
        Ann50WordsPrice
        Ann100WordsPrice
      }
    }
  }
`;

export const GET_DRAFT = gql`
  query GetDraft($getDraftId: ID!) {
    advertiser {
      getDraft(id: $getDraftId) {
        subTotal
        id
        booking {
          slotId
          quantity
          language
          date
          broadcasterId
          advertType
        }
      }
    }
  }
`;

export const GET_CAMPAIGN_SUMMARY_FROM_DRAFT = gql`
  query GetCampaignSummaryFromDraft($draftId: ID!) {
    advertiser {
      getCampaignSummaryFromDraft(draftId: $draftId) {
        campaignSummary {
          id
          name
          price
          banner
        }
        subTotal
        vat
        totalDiscountApplied
        discountSummary {
          regularDiscount {
            radioStationName
            discountPercentage
            discountAmount
          }
          volumeDiscount {
            radioStationName
            discountPercentage
            discountAmount
          }
          specialAdvertiserDiscount {
            radioStationName
            discountPercentage
            discountAmount
          }
          subTotal
        }
        grandTotal
      }
    }
  }
`;

export const GET_CAMPAIGN_DETAILS = gql`
  query GetCampaignDetails($campaignId: ID!) {
    broadcaster {
      getCampaignDetails(campaignId: $campaignId) {
        id
        status
        startDate
        endDate
        advertType
        duration
        language
        numberOfDays
        numberOfSpots
        totalAmount
        links
        paymentMethod
        campaignDocument {
          name
          url
        }
        bookedSlots {
          startDate
          endDate
          slots {
            advertType
            date
            quantity
            language
            startTime
            endTime
          }
          bookingDetails {
            totalNoOfDays
            totalNoOfSpots
            totalNoOfSlots
          }
        }
      }
    }
  }
`;

export const ADVERTISER_CAMPAIGN_DETAILS = gql`
  query GetCampaignDetails($campaignId: ID!) {
    advertiser {
      getCampaignDetails(campaignId: $campaignId) {
        id
        startDate
        endDate
        campaignDocument {
          name
          url
        }
        radioStationDetails {
          id
          radioStation
          advertType
          duration
          language
          numberOfDays
          numberOfSpots
          totalAmount
          status
          paymentMethod
          bookedSlots {
            startDate
            endDate
            slots {
              advertType
              date
              quantity
              language
              startTime
              endTime
            }
            bookingDetails {
              totalNoOfDays
              totalNoOfSpots
              totalNoOfSlots
            }
          }
        }
      }
    }
  }
`;

export const GET_ADVERTISER_PORTFOLIOS = gql`
  query GetAllPortfolios {
    advertiser {
      getAllPortfolio {
        id
        title
        propertyId
        metric
      }
    }
  }
`;

export const GET_CAMPAIGNS_FOR_PORTFOLIOS = gql`
  query GetCampaignForPortfolio {
    advertiser {
      getCampaignForPortfolio {
        id
        name
      }
    }
  }
`;

export const GET_RADIOSTATION_FOR_PORTFOLIO = gql`
  query GetRadioStationsForPortfolio($portfolioId: ID!) {
    advertiser {
      getRadioStationsForPortfolio(portfolioId: $portfolioId) {
        radioStationId
        radioStationName
      }
    }
  }
`;

export const GET_PORTFOLIO_METRICS = gql`
  query GetPortfolioMetrics(
    $portfolioId: ID!
    $duration: Int!
    $radioStationId: ID!
  ) {
    advertiser {
      getPortfolioMetrics(
        portfolioId: $portfolioId
        duration: $duration
        radioStationId: $radioStationId
      ) {
        activeListiners
        spotPlays
      }
    }
  }
`;

export const GET_UNAPPROVED_BROADCASTERS = gql`
query GetUnapprovedBroadcasters {
  admin {
    getUnapprovedBroadcasters {
      createdAt
      email
      group
      id
      isApproved
      isVerified
      radioStationName
    }
  }
}
`;
