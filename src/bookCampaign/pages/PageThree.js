import React, { useState, useEffect } from "react";
import "./css/page-three.css";
import MainFooterSect from "../../components/MainFooterSect.js";
import CardOne from "../../pages/ResponsiveAdvertiserDashboard/assets/paymentCard.svg"
import CardTwo from "../../pages/ResponsiveAdvertiserDashboard/assets/paymentCardTwo.svg"
import CardThree from "../../pages/ResponsiveAdvertiserDashboard/assets/paymentCardThree.svg"
import FilePlus from "../../pages/ResponsiveAdvertiserDashboard/assets/file-plus.svg"
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify"
import { useDisclosure } from "@chakra-ui/react";
import PaystackPop from "@paystack/inline-js"
import { CREATE_CAMPAIGN, PAY_FOR_CAMPAIGN } from "../../components/GraphQL/Mutation";
import { WALLET_BALANCE, USER_INFO } from "../../components/GraphQL/Queries";
import SuccessModal from "../../components/Modal/PaymentModal/SuccessModal";
import AdvertDashboardLayout from "../../pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/AdvertDashboardLayout";


const PageThree = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    const walletBalance = useQuery(WALLET_BALANCE);
    const getUserInfo = useQuery(USER_INFO);
    const [payForCampaign] = useMutation(PAY_FOR_CAMPAIGN);

    const campaignSummary = localStorage.getItem("campaignSummary");

    const [isProceed, setIsProceed] = useState(false);
    const [amount, setAmount] = useState("");
    const [filename, setFileName] = useState("");
    const [createCampaign, setCreateCampaign] = useState({
        name: "",
        companyName: "",
        industryName: "",
        links: "",
        files: "",
        draftId: JSON.parse(campaignSummary).advertiser.createDraft.id,
    });

    //get save user and campaign data
    const getUserEmail = getUserInfo.data?.auth.me.email;
    const getUserId = getUserInfo.data?.auth.me.id;
    const getTotalAmount =
        JSON.parse(campaignSummary).advertiser.createDraft.summary.grandTotal;

    useEffect(() => {
        const campaignSummary = localStorage.getItem("campaignSummary");
        const totalAmount = () => {
            setAmount(
                JSON.parse(campaignSummary).advertiser.createDraft.summary.grandTotal
            );
        };
        totalAmount();
    }, [amount]);

    const handleChange = (e) => {
        setCreateCampaign({ ...createCampaign, [e.target.name]: e.target.value });
    };

    const saveFile = ({
        target: {
            validity,
            files: [files],
        },
    }) => {
        if (validity.valid) {
            // return files
            setFileName(files);
            setCreateCampaign(files);
            setCreateCampaign({ ...createCampaign, files: files });
        }
    };

    const [campaign, { loading }] = useMutation(CREATE_CAMPAIGN, {
        context: {
            headers: {
                "apollo-require-preflight": true,
            },
        },
        async onCompleted(data) {
            const paystack = new PaystackPop();
            paystack.newTransaction({
                key: "pk_live_e017bd836d9f46e661f9b82e076219ee33f66d9c",
                amount: getTotalAmount * 100,
                email: getUserEmail,
                callback: function (response) {
                    payForCampaign({
                        variables: {
                            input: {
                                userId: getUserId,
                                referenceId: response.reference,
                                paymentMethod: "Paystack",
                                campaignId: data?.advertiser.createCampaign.id,
                                amountPaid: amount,
                            },
                        },
                        onCompleted: () => {
                            onOpen();
                        },
                        onError: (error) => {
                            toast.error(error?.networkError?.result?.errors[0]?.message);
                        },
                    });
                },
            });
        },

        onError: (error) => {
            toast.error(error?.networkError?.result?.errors[0]?.message);
        },
    });

    const submitCampaign = () => {
        campaign({
            variables: {
                name: createCampaign.name,
                companyName: createCampaign.companyName,
                industryName: createCampaign.industryName,
                links: createCampaign.links,
                files: createCampaign.files,
                draftId: createCampaign.draftId,
            },
        });
    };
    return (
        <AdvertDashboardLayout>
            <SuccessModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1><b>campaign details</b></h1>
                    <div>
                        <span>wallet balance: </span>
                        <span>
                            NGN{" "}
                            {walletBalance.data?.advertiser.getWalletBalance.currentBalance}
                        </span>
                    </div>
                </div>
                <div className="checkout-wrapper">
                    <form className={isProceed ? "hide" : ""}>
                        <h4 className="card-option-wrapper">
                            Select your preffered payment method
                        </h4>
                        <div className="payment-card-wrapper">
                            {/* <div>

                                <div>
                                    <img src={CardOne}
                                        alt='wallet-icon'
                                    />

                                </div>
                                <span className='card-type-wrapper'>
                                    PAY FROM WALLET
                                </span>
                            </div> */}

                            <div>
                                <div>
                                    <img src={CardTwo} alt="paystack-icon" />
                                </div>
                                <span className="card-type-wrapper">PAY WITH PAYSTACK</span>
                            </div>
                            {/* <div>
                                <div>
                                    <img src={CardThree}
                                        alt='flutter-icon'
                                    />

                                </div>
                                <span
                                    className='card-type-wrapper'
                                >
                                    PAY WITH FLUTTERWAVE
                                </span>

                            </div> */}
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="campaign_name">Campaign Name:</label>
                            <input
                                type="text"
                                placeholder="Enter campaign name"
                                className="input_field"
                                name="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="company_name">Name of Company :</label>
                            <input
                                type="text"
                                placeholder="Enter your ompany name"
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
                        <div class="drop-zone">
                            <div class="drop-zone__prompt">
                                <img src={FilePlus} alt="" /> <br />
                                <div className="drag-details">
                                    <span> Drag and Drop files here </span>
                                    <span> file format: mp3/mp4/pdf</span>
                                    <button className="file-btn">browse</button>
                                    <span>{filename.name ? filename.name : ""}</span>
                                    <h4>
                                        maximum size: <p>10mb</p>{" "}
                                    </h4>
                                </div>
                            </div>
                            <input
                                type="file"
                                name="files"
                                class="drop-zone__input"
                                onChange={saveFile}
                            />
                        </div>
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

                            {JSON.parse(
                                campaignSummary
                            ).advertiser.createDraft.summary.campaignSummary.map(
                                (summary) => {
                                    return (
                                        <div className="mobile-ad-card">
                                            <img src={summary.banner} alt="" />
                                            <div>
                                                <h4>{summary.name}</h4>
                                                <span>NGN {summary.price}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                            <div className="ad-card-footer">
                                <div className="ad-footer-info">
                                    <h2>subtotal</h2>
                                    <span>
                                        NGN{" "}
                                        {
                                            JSON.parse(campaignSummary).advertiser.createDraft.summary
                                                .subTotal
                                        }
                                    </span>
                                </div>
                                <div className="ad-footer-info">
                                    <h2>vat 7.5%</h2>
                                    <span>
                                        NGN{" "}
                                        {
                                            JSON.parse(campaignSummary).advertiser.createDraft.summary
                                                .vat
                                        }
                                    </span>
                                </div>
                                <div className="ad-footer-info">
                                    <h2>special adviser discount</h2>
                                    <span>
                                        NGN{" "}
                                        {
                                            JSON.parse(campaignSummary).advertiser.createDraft.summary
                                                .totalDiscountApplied
                                        }
                                    </span>
                                </div>
                                <div className="ad-footer-info">
                                    <h2>grand total</h2>
                                    <span>
                                        NGN{" "}
                                        {
                                            JSON.parse(campaignSummary).advertiser.createDraft.summary
                                                .grandTotal
                                        }
                                    </span>
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
                                {JSON.parse(
                                    campaignSummary
                                ).advertiser.createDraft.summary.campaignSummary.map(
                                    (summary) => {
                                        return (
                                            <div className="ad-card">
                                                <img src={summary.banner} alt="" />
                                                <div>
                                                    <h4>{summary.name}</h4>
                                                    <span>NGN {summary.price}</span>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </>
                        }
                        <div className="ad-card-footer">
                            <div className="ad-footer-info">
                                <h2>subtotal</h2>
                                <span>
                                    NGN{" "}
                                    {
                                        JSON.parse(campaignSummary).advertiser.createDraft.summary
                                            .subTotal
                                    }
                                </span>
                            </div>
                            <div className="ad-footer-info">
                                <h2>vat 7.5%</h2>
                                <span>
                                    NGN{" "}
                                    {
                                        JSON.parse(campaignSummary).advertiser.createDraft.summary
                                            .vat
                                    }
                                </span>
                            </div>
                            <div className="ad-footer-info">
                                <h2>special adviser discount</h2>
                                <span>
                                    NGN{" "}
                                    {
                                        JSON.parse(campaignSummary).advertiser.createDraft.summary
                                            .totalDiscountApplied
                                    }
                                </span>
                            </div>
                            <div className="ad-footer-info">
                                <h2>grand total</h2>
                                <span>
                                    NGN{" "}
                                    {
                                        JSON.parse(campaignSummary).advertiser.createDraft.summary
                                            .grandTotal
                                    }
                                </span>
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
        </AdvertDashboardLayout>
    );
};

export default PageThree;
