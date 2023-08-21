import "./style.css";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { CREATE_CAMPAIGN } from "../GraphQL/Mutation";
import {
  GET_CAMPAIGN_SUMMARY_FROM_DRAFT,
  WALLET_BALANCE,
} from "../GraphQL/Queries";
import SuccessModal from "../Modal/PaymentModal/SuccessModal";
import CardOne from "../../assets/icons/card.svg";
import CardTwo from "../../assets/icons/card-two.svg";
import End2EndIcon from "../../assets/icons/end2end.svg";
import AdvertDashboardLayout from "../../pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout";

import {
  APCON_CERT_FILE_TYPE,
  JINGLE_FILE_TYPE,
  PAID_ANNOUNCEMENT_FILE_TYPE,
} from "../../constant";
import { UploadComponent } from "./components";
import UploadFile from "../UploadFile/UploadFile";
import { useParams } from "react-router-dom";
import { TableSpinner } from "../Spinner";
import { useFormatAmount } from "../../hook";
import { CheckIcon } from "@chakra-ui/icons";
import { Loader } from "../../../src/components/Spinner/Loader";

const CampaignCheckout = () => {
  const end2EndPay = window.End2EndPAY;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const [jingleFile, setJingleFile] = useState("");
  const [paidAnnouncementFile, setPaidAnnouncementFile] = useState("");
  const [apconCertFile, setApconCertFile] = useState("");
  const [campaignSummary, setCampaignSummary] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Paystack");
  const [isLoading, setIsLoading] = useState(false);

  const tast = useToast();

  // get draftId from url params
  const params = useParams();

  const formatAmount = useFormatAmount;

  const onDropJingleAudio = useCallback((acceptedFiles) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    acceptedFiles[0].size > MAX_FILE_SIZE && !isLoading
      ? setTimeout(() => {
          tast({
            title: "File too Large",
            description: "File is too large. Maximum size is 5MB",
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
          });
        }, 3000)
      : setJingleFile(acceptedFiles[0]);
  }, []);

  const onDropPaidAnnouncementScript = useCallback((acceptedFiles) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    acceptedFiles[0].size > MAX_FILE_SIZE && !isLoading
      ? setTimeout(() => {
          tast({
            title: "File too Large",
            description: "File is too large. Maximum size is 5MB",
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
          });
        }, 2000)
      : setPaidAnnouncementFile(acceptedFiles[0]);
  }, []);

  const onDropApconCert = useCallback((acceptedFiles) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    acceptedFiles[0].size / 1024 / 1024 > 1 && isLoading
      ? setTimeout(() => {
          tast({
            title: "File too Large",
            description: "File is too large. Maximum size is 1MB",
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "top",
          });
        }, 3000)
      : setApconCertFile(acceptedFiles[0]);
  }, []);

  const walletBalance = useQuery(WALLET_BALANCE);
  const [getCampaignSummaryFromDraft, campaignSummaryFromDraft] = useLazyQuery(
    GET_CAMPAIGN_SUMMARY_FROM_DRAFT
  );

  const [isProceed, setIsProceed] = useState(false);
  const [createCampaign, setCreateCampaign] = useState({
    name: "",
    companyName: "",
    industryName: "",
    links: "",
    files: "",
    draftId: params.draftId,
  });

  useEffect(() => {
    // Get campaign summary from localhost or server
    const tempCampaignSummary = JSON.parse(
      localStorage.getItem("campaignSummary")
    );

    if (
      tempCampaignSummary &&
      tempCampaignSummary.advertiser.createDraft.id === params.draftId
    ) {
      setCampaignSummary(tempCampaignSummary.advertiser.createDraft.summary);
    } else {
      getCampaignSummaryFromDraft({
        variables: {
          draftId: params.draftId,
        },
      });
    }

    if (campaignSummaryFromDraft.data)
      setCampaignSummary(
        campaignSummaryFromDraft.data.advertiser.getCampaignSummaryFromDraft
      );
  }, [campaignSummaryFromDraft.data]);

  const handleChange = (e) => {
    setCreateCampaign({ ...createCampaign, [e.target.name]: e.target.value });
  };

  const [campaign, { loading }] = useMutation(CREATE_CAMPAIGN, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    async onCompleted(data) {
      const result = data.advertiser.createCampaign;

      switch (result.paymentMethod) {
        case "Paystack":
          // redirect to paystack payment page
          window.location.href = result.authorizationUrl;
          break;

        case "End2End":
          end2EndPay.init(
            result.apiKey,
            result.accessKey,
            result.amount,
            result.currency,
            result.callbackUrl,
            result.userEmail,
            result.referenceId
          );
          end2EndPay.getPaymentForm();
          break;

        default:
          // Wallet
          console.log(result);
          break;
      }
    },

    onError: (error) => {
      toast.error(error?.networkError?.result?.errors[0]?.message);
    },
  });

  const submitCampaign = () => {
    let fileObj = {};
    if (jingleFile) {
      fileObj["jingleAudioFile"] = jingleFile;
    }
    if (paidAnnouncementFile) {
      fileObj["paidAnnuoncementScriptFile"] = paidAnnouncementFile;
    }
    if (apconCertFile) {
      fileObj["apconCertificateFile"] = apconCertFile;
    }
    campaign({
      variables: {
        input: {
          name: createCampaign.name,
          companyName: createCampaign.companyName,
          industryName: createCampaign.industryName,
          links: createCampaign.links,
          draftId: createCampaign.draftId,
          paymentMethod: paymentMethod,
          checkoutPageUrl: `${window.location.origin}/book-campaign/success`,
          ...fileObj,
        },
      },
    });
  };

  return (
    <>
      <div
        id="end2endContainer"
        style={{
          width: "100%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "1000",
          background: "white",
        }}
      ></div>
      <AdvertDashboardLayout>


        {isLoading && <Loader />}


        <SuccessModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
        {campaignSummary ? (
          <div className="checkout-container">
            <div className="checkout-header">
              <h1>
                <b>campaign details</b>
              </h1>
              <div>
                <span>wallet balance: </span>
                <span>
                  {formatAmount(
                    walletBalance.data?.advertiser.getWalletBalance
                      .currentBalance
                  )}
                </span>
              </div>
            </div>
            <div className="checkout-wrapper">
              <form className={isProceed ? "hide" : ""}>
                <h4 className="card-option-wrapper">
                  Select your preffered payment method
                </h4>
                <div className="payment-card-wrapper">
                  <div
                    className={
                      paymentMethod === "Paystack" ? "active__payment-type" : ""
                    }
                    onClick={() => setPaymentMethod("Paystack")}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={CardTwo} alt="paystack-icon" />
                      <div
                        className={
                          paymentMethod === "Paystack"
                            ? "payment__check-icon"
                            : "hide__check-icon"
                        }
                      >
                        <CheckIcon boxSize={4} color="#F99B28" />
                      </div>
                    </div>
                    <span className="card-type-wrapper">PAY WITH PAYSTACK</span>
                  </div>
                  <div
                    className={
                      paymentMethod === "End2End" ? "active__payment-type" : ""
                    }
                    onClick={() => setPaymentMethod("End2End")}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={End2EndIcon} alt="end2end-icon" />
                      <div
                        className={
                          paymentMethod === "End2End"
                            ? "payment__check-icon"
                            : "hide__check-icon"
                        }
                      >
                        <CheckIcon boxSize={4} color="#F99B28" />
                      </div>

                    </div>
                    <span className="card-type-wrapper">PAY WITH END2END</span>
                  </div>
                  <div
                    className={
                      paymentMethod === "Wallet" ? "active__payment-type" : ""
                    }
                    onClick={() => setPaymentMethod("Wallet")}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={CardOne} alt="wallet-icon" />
                      <div
                        className={
                          paymentMethod === "Wallet"
                            ? "payment__check-icon"
                            : "hide__check-icon"
                        }
                      >
                        <CheckIcon boxSize={4} color="#F99B28" />
                      </div>
                    </div>
                    <span className="card-type-wrapper">PAY FROM WALLET</span>
                  </div>
                </div>
                <div className="input_wrap">
                  <label htmlFor="campaign_name">Campaign Name:</label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    className="input_field"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="input_wrap">
                  <label htmlFor="company_name">Name of Company :</label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="input_field"
                    name="companyName"
                    onChange={handleChange}
                  />
                </div>
                <div className="input_wrap">
                  <label htmlFor="industry_name">Name of Industry:</label>
                  <input
                    type="text"
                    placeholder="Enter industry name"
                    className="input_field"
                    name="industryName"
                    onChange={handleChange}
                  />
                </div>
                <div className="input_wrap">
                  <label htmlFor="link_url">Paste Campaign Link Here:</label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    className="input_field paste_url"
                    name="links"
                    onChange={handleChange}
                  />
                </div>
                <VStack spacing="24px" alignItems="flex-start">
                  <UploadFile
                    uploadText="Jingle Audio"
                    fileFormat=" MP3 / WAV / M4A / AAC"
                    onDrop={onDropJingleAudio}
                    fileType={JINGLE_FILE_TYPE}
                    file={jingleFile}
                  />

                  <UploadFile
                    uploadText="Paid Announcement Script"
                    fileFormat="DOCX / PDF / TXT"
                    onDrop={onDropPaidAnnouncementScript}
                    fileType={PAID_ANNOUNCEMENT_FILE_TYPE}
                    file={paidAnnouncementFile}
                  />
                  <UploadFile
                    uploadText="APCON Certificate"
                    fileFormat="PNG / JPEG / PDF"
                    onDrop={onDropApconCert}
                    fileType={APCON_CERT_FILE_TYPE}
                    file={apconCertFile}
                  />
                </VStack>
              </form>
              <div className="checkout-process-btn">
                <button
                  onClick={() => {
                    setIsProceed(true);
                  }}
                >
                  proceed to summary
                </button>
              </div>
              {isProceed && (
                <div className=" mobile-ad-wrapper">
                  <h3>campaign summary</h3>

                  {campaignSummary.campaignSummary.map((summary) => {
                    return (
                      <div className="mobile-ad-card">
                        <img src={summary.banner} alt="" />
                        <div>
                          <h4>{summary.name}</h4>
                          <span>{formatAmount(summary.price)}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="ad-card-footer">
                    <div className="ad-footer-info">
                      <h2>subtotal</h2>
                      <span>{formatAmount(campaignSummary.subTotal)}</span>
                    </div>
                    <div className="ad-footer-info">
                      <h2>vat 7.5%</h2>
                      <span>{formatAmount(campaignSummary.vat)}</span>
                    </div>
                    <div className="ad-footer-info">
                      <h2>special adviser discount</h2>
                      <span>
                        {formatAmount(campaignSummary.totalDiscountApplied)}
                      </span>

                    </div>
                    <div className="ad-footer-info">
                      <h2>grand total</h2>
                      <span>{formatAmount(campaignSummary.grandTotal)}</span>
                    </div>

                    <div className="ad-footer-info ad-action-wrapper">
                      <h2>cancel</h2>
                      <button onClick={submitCampaign}>
                        {loading ? (
                          <i class="fa fa-circle-o-notch fa-spin"></i>
                        ) : (
                          "continue"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="ad-wrapper">
                <h3 className="ad-wrapper-title">campaign summary</h3>
                {
                  <>
                    {campaignSummary.campaignSummary.map((summary) => {
                      return (
                        <div className="ad-card">
                          <img src={summary.banner} alt="" />
                          <div>
                            <h4>{summary.name}</h4>
                            <span>{formatAmount(summary.price)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                }
                <div className="ad-card-footer">
                  <div className="ad-footer-info">
                    <h2>subtotal</h2>
                    <span>{formatAmount(campaignSummary.subTotal)}</span>
                  </div>
                  <div className="ad-footer-info">
                    <h2>vat 7.5%</h2>
                    <span>{formatAmount(campaignSummary.vat)}</span>
                  </div>
                  <div className="ad-footer-info">
                    <h2>special adviser discount</h2>
                    <span>
                      {formatAmount(campaignSummary.totalDiscountApplied)}
                    </span>
                  </div>
                  <div className="ad-footer-info">
                    <h2>grand total</h2>
                    <span> {formatAmount(campaignSummary.grandTotal)}</span>
                  </div>
                  <div className="ad-footer-info ad-action-wrapper">
                    <h2>cancel</h2>
                    <button
                      onClick={() => {
                        submitCampaign();
                      }}
                    >
                      {loading ? (
                        <i class="fa fa-circle-o-notch fa-spin"></i>
                      ) : (
                        "continue"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TableSpinner />
        )}
      </AdvertDashboardLayout>
    </>
  );
};

export default CampaignCheckout;
