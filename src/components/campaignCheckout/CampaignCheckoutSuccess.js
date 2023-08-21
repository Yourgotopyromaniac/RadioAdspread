import React, { useEffect, useState } from "react";
import AdvertDashboardLayout from "../../pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout";
import { useMutation } from "@apollo/client";
import {
  PAY_FOR_CAMPAIGN_FROM_PAYSTACK,
  REFRESH_TRANSACTION,
} from "../GraphQL/Mutation";
import { TableSpinner } from "../Spinner";
import SuccessModal from "../Modal/PaymentModal/SuccessModal";
import { useDisclosure } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function CampaignCheckoutSuccess() {
  const [payForCampaignFromPaystack] = useMutation(
    PAY_FOR_CAMPAIGN_FROM_PAYSTACK,
    {
      onCompleted: () => {
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error?.networkError?.result?.errors[0]?.message);
      },
    }
  );

  const [refreshTransaction] = useMutation(REFRESH_TRANSACTION, {
    onCompleted: () => {
      handleSuccess();
    },
    onError: (error) => {
      toast.error(error?.networkError?.result?.errors[0]?.message);
    },
  });

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [loading, setLoading] = useState(true);

  function handleSuccess() {
    // close loading spinner
    setLoading(false);

    // open success modal
    onOpen();
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);

    const paymentMethod = queryParameters.get("paymentMethod");

    if (paymentMethod === "Paystack") {
      // handle Paystack payments
      const campaignId = queryParameters.get("campaignId");
      const referenceId = queryParameters.get("reference");

      payForCampaignFromPaystack({
        variables: {
          input: {
            campaignId,
            referenceId,
          },
        },
      });
    } else {
      const transactionId = queryParameters.get("transactionId");

      // handle End2End payment
      refreshTransaction({
        variables: {
          transactionId,
        },
      });
    }
  }, [payForCampaignFromPaystack, refreshTransaction]);

  return (
    <AdvertDashboardLayout>
      <SuccessModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      <div className="checkout-container">
        <div className="checkout-header">{loading && <TableSpinner />}</div>
      </div>
    </AdvertDashboardLayout>
  );
}
