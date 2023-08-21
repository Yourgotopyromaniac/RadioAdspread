import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";

//Mutation Query
import { CREATE_PORTFOLIO } from "../../../../../../components/GraphQL/Mutation";
import PortfolioCreatedModal from "../../../../../../components/Modal/analytics/PortfolioCreatedModal";
import { PortfolioSchema } from "../../../../../../utils/validations";
import "../../../css/create-portfolio.css";
import { GET_CAMPAIGNS_FOR_PORTFOLIOS } from "../../../../../../components/GraphQL/Queries";

const AdvertiserCreatePortfolio = () => {
  const [openModal, setOpenModal] = useState(false);

  const [campaignName, setCampaignName] = useState("");
  const [campaignId, setCampaignId] = useState("");

  const toast = useToast();
  const { data: { advertiser: { getCampaignForPortfolio = [] } = {} } = {} } =
    useQuery(GET_CAMPAIGNS_FOR_PORTFOLIOS);

  // console.log(data, 'DATA')

  const [createPortfolio, { loading }] = useMutation(CREATE_PORTFOLIO, {
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    onCompleted: () => {
      setOpenModal(true);
    },
    onError: (errors) => {
      toast({
        title: `${errors.networkError.result.errors[0].message}`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      propertyId: "",
      metric: "session",

      campaignId: "",

    },
    validationSchema: PortfolioSchema,
    onSubmit() {
      createPortfolio({
        variables: {
          input: {
            title: values.title,
            propertyId: values.propertyId,
            metric: values.metric,

            campaignId: campaignId,

          },
        },
      });
    },
  });

  const handleOptionChange = (event) => {
    const selectedCampaign = event.target.value;
    setCampaignName(selectedCampaign);
    setCampaignId(getCampaignId(selectedCampaign));
  };

  const getCampaignId = (selectedCampaign) => {

    const campaignOption = getCampaignForPortfolio.find(
      (campaign) => campaign.name === selectedCampaign
    );
    return campaignOption ? campaignOption.id : "";

  };

  return (
    <>
      {openModal && <PortfolioCreatedModal closeModal={setOpenModal} />}
      <div className="create-portfolio-container">
        <div className="create-portfolio-header">
          <h4>create analytics portfolio</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="portfolio-input-container">
            <div className="form-input-wrapper">
              {errors.title && touched.title && <span>{errors.title}</span>}
              <div>
                <span>Portfolio title</span>
                <fieldset className="portfolio-input">
                  <input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter your portfolio title"
                    required
                  />
                </fieldset>
              </div>
            </div>

            <div className="form-input-wrapper">
              {errors.propertyId && touched.propertyId && (
                <span>{errors.propertyId}</span>
              )}
              <div>
                <span>Property ID</span>
                <fieldset className="portfolio-input">
                  <input
                    name="propertyId"
                    value={values.propertyId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Enter property ID"
                    required
                  />
                </fieldset>
              </div>
            </div>
            <div className="form-input-wrapper">
              {errors.metric && touched.metric && <span>{errors.metric}</span>}
              <div>
                <span>Default Metric to Track</span>
                <fieldset className="portfolio-input">
                  <select
                    name="metric"
                    value={values.metric}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue="sessions"
                    style={{ width: "100%" }}
                  >
                    <option value="sessions">Sessions</option>
                    <option value="new users">New Users</option>
                    <option value="promotion views">Promotion Views</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <div className="form-input-wrapper">
              {errors.metric && touched.metric && <span>{errors.metric}</span>}
              <div>
                <span>Select campaign for portfolio</span>
                <fieldset className="portfolio-input">
                  <select
                    name="campaign"
                    value={campaignName}
                    onChange={handleOptionChange}
                    onBlur={handleBlur}
                    // defaultValue="sessions"
                    style={{ width: "100%" }}
                  >
                    <option value="">Select</option>
                    {getCampaignForPortfolio?.map((campaign) => (
                      <option value={campaign.name}>{campaign.name}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="portfolio-btn-container">
            <button type="submit">
              {loading ? (
                <i class="fa fa-circle-o-notch fa-spin"></i>
              ) : (
                "create portfolio"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdvertiserCreatePortfolio;
