import { useAtom } from "jotai";
import { loginModalAtom, isBookingState } from "./atom/advertiserModal";
import { CREATE_DRAFTS } from "./components/GraphQL/Mutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import { URL } from "./config/url";
import { useState } from "react";

// export const useFormatAmount = (amount) => {
//   return `NGN ${parseInt(amount)
//     .toFixed(2)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
// };

export const useFormatAmount = (amount) => {
  // Check if amount is a valid number
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 0;
  }

  // Format the amount as NGN
  const formattedAmount = `NGN ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return formattedAmount;
};

export const useCreateDraftFromBookings = () => {
  const [, setLoginModal] = useAtom(loginModalAtom);
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const [, setIsbooking] = useAtom(isBookingState);

  const createDraft = async (bookings) => {
    const graphqlClient = new GraphQLClient(URL, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Apollo-Require-Preflight": "true",
      },
    });

    try {
      setLoading(true);

      const data = await graphqlClient.request(CREATE_DRAFTS, {
        input: [...bookings],
      });

      localStorage.setItem("selectedStations", "");
      localStorage.setItem("campaignSummary", JSON.stringify(data));

      // user has stopped booking
      setIsbooking(false);

      // remove booking from local storage
      localStorage.removeItem("booking");
      setLoading(false);
      toast.success("Success");

      const draftId = data.advertiser.createDraft.id;
      navigate(`/book-campaign/checkout/${draftId}`);
    } catch (error) {
      setLoading(false);

      if (error.response.status === 401) {
        toast.error("session expired, Please Login");

        return setTimeout(() => {
          setIsbooking(true);
          setLoginModal(true);
        }, 100);
      }

      toast.error(error.response.errors[0].message);
    }
  };

  return {
    loading,
    createDraft,
  };
};

export const useLoginModalState = () => {
  const [loginModal, setLoginModal] = useAtom(loginModalAtom);

  const showLoginModalHandler = (loginModalStatus) => {
    setLoginModal(!loginModalStatus);
  };

  return {
    loginModal,
    showLoginModalHandler,
    setLoginModal,
  };
};
