import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";

import LandingPage from "./pages/LandingPage.js";
import Broadcaster from "./pages/Broadcaster.js";
import Login from "./pages/login";
import SignupVendor from "./pages/signup/VendorSignup";
import TalkWithAnExpert from "./pages/TalkWithExpert.js";
import BookCampaign from "./pages/BookCampaign.js";
import PageOne from "./bookCampaign/pages/PageOne.js";
import PageTwo from "./bookCampaign/pages/PageTwo.js";
import DashboardVendor from "./pages/dashboard-vendor";
import DashboardStation from "./pages/dashboard-station";
import DashboardReport from "./pages/dashboardReport";
import PaymentPage from "./pages/paymentPage";
import ProgramSchedulePage from "./pages/programSchedulePage";
import CampaignPage from "./pages/CampaignPage/campaignPage";
import Dashboard from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/dashboard";
import StationBooking from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/station-booking";
import Draft from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/draft";
import Wallet from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/wallet";
import Profile from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/profile";
import ResetPassword, {
  ResetVendorPassword,
} from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/reset-password";
import VendorDashbaordLayout from "./pages/ResponsiveAdvertiserDashboard/ResponsiveAdvertiserDashboardLayout/vendorDashboard/VendorDashbaordLayout";
import Slot from "./components/Modal/Slot";
import ProtectedRoute from "./protectedRoute";
import AdvertiserSignup from "./pages/signup/advertiserSignup";
import SignupModal from "./components/Modal/signup/SignupModal";
import AdvertiserBooking from "./pages/advertiserDashboard/advertiser-booking";
import { VendorRegistrationLayout } from "./components/VendorRegistrationLayout";
import { AccountConfirmation } from "./pages/AccountConfirmation";
import CampaignCheckout from "./components/campaignCheckout/CampaignCheckout";
import SetNewPassword from "./components/setNewPassword";
import { CampaignPageHome } from "./pages/CampaignPage/components/CampaignHome";
import CampaignBookings from "./pages/CampaignPage/components/Bookings";
import BookedSlots from "./pages/CampaignPage/components/BookedSlots";
import BroadcasterProfile from "./pages/BroadcasterProfile";
import AdvertiserCampaignsHomepage from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/AdvertiserCampaignsPage/CampaignHome";
import AdertiserBookingDetails from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/AdvertiserCampaignsPage/Bookings";
import AdvertiserBookedSlotsDetails from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/AdvertiserCampaignsPage/BookedSlots";
import AdvertiserCampaignPage from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/AdvertiserCampaignsPage/campaignPage";
import AdvertiserAnalytics from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/Analytic";
import AdvertiserCreatePortfolio from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/Analytic/CreatePortfolio";
import AnalyticTable from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/Analytic/AnalyticTable";
import AnalyticPage from "./pages/ResponsiveAdvertiserDashboard/AdvertiserPages/Pages/Analytic/AnalyticPage";
import CampaignCheckoutSuccess from "./components/campaignCheckout/CampaignCheckoutSuccess";
import LoginAdminPortal from "./pages/login-admin";
import AdminVerificationPortal from "./pages/AdminVerificationPortal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<LandingPage />} />
          <Route path="/radio-station" element={<Broadcaster />} />
          <Route path="talk-with-an-expert" element={<TalkWithAnExpert />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<AdvertiserSignup />} />
          <Route path="signup/vendor" element={<SignupVendor />} />
          <Route
            path="signup/verify-account/:usergroup"
            element={
              <VendorRegistrationLayout>
                <AccountConfirmation />
              </VendorRegistrationLayout>
            }
          />
          <Route path="/book-campaign/" element={<BookCampaign />}>
            <Route path="" element={<PageOne />} />
            <Route
              path="/book-campaign/campaign-details"
              element={<PageTwo />}
            />
          </Route>
          <Route
            path="/dashboard/vendor"
            element={
              <ProtectedRoute>
                <DashboardVendor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor/station"
            element={
              <ProtectedRoute>
                <DashboardStation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor/campaign-page"
            element={
              <ProtectedRoute>
                <CampaignPage />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<CampaignPageHome />} />
            <Route path="bookings/:id" element={<CampaignBookings />} />
            <Route path="booked-slots/:id" element={<BookedSlots />} />
          </Route>
          <Route
            path="/dashboard/vendor/reports"
            element={
              <ProtectedRoute>
                <DashboardReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor/profile"
            element={
              <ProtectedRoute>
                <BroadcasterProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/vendor/program-schedule"
            element={
              <ProtectedRoute>
                <ProgramSchedulePage />
              </ProtectedRoute>
            }
          />

          {/* <Route path='/advertiser/dashboard' element={<AdvertiserDashvendor />} />
          <Route path='/advertiser/station' element={<ProgramSchedulePage />} />
          <Route path='/advertiser/campaign' element={<AdvertiserDashCampaign />} />
          <Route path='/advertiser/draft' element={<Advertiserdraft />} />
          <Route path='/advertiser/wallet' element={<AdvertiserWallet />} />
          <Route path="/advertiser/profile" element={<AdvertiserProfilePage />} />
          <Route path='page' element={<CampaignDetails />} /> */}

          {/* <ProtectedRoute path='/dashboard' element={Dashboard} /> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* </ProtectedRoute> */}

          {/* <Route
            path="/dashboard/station"
            element={
              <ProtectedRoute>
                <StationDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/booking"
            element={
              <ProtectedRoute>
                <StationBooking />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/dashboard/station" element={<AdvertiserCampaignPage />}>
            <Route path="" element={<AdvertiserCampaignsHomepage />} />
            <Route path="booking/:id" element={<AdertiserBookingDetails />} />
            <Route
              path="booked-slots/:id"
              element={<AdvertiserBookedSlotsDetails />}
            />
          </Route>
          <Route
            path="/dashboard/draft"
            element={
              <ProtectedRoute>
                <Draft />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/campaign/:id"
            element={
              <ProtectedRoute>
                <StationBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-campaign/checkout/:draftId"
            element={
              <ProtectedRoute>
                <CampaignCheckout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-campaign/success/"
            element={
              <ProtectedRoute>
                <CampaignCheckoutSuccess />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/dashboard/draft/checkout/:id"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          /> */}
                  <Route path="/admin" element={<LoginAdminPortal/>}/>
                  <Route path="/admin/verification-portal" element={<AdminVerificationPortal/>}/>   
                  <Route path="/campaign/:id" element={<AdvertiserBooking />} />

          <Route path="/analytics" element={<AdvertiserAnalytics />}>
            <Route path="" element={<AnalyticTable />} />
            <Route
              path="create-portfolio"
              element={<AdvertiserCreatePortfolio />}
            />
            <Route path="portfolios" element={<AnalyticTable />} />
            <Route path="portfolio/:id" element={<AnalyticPage />} />
          </Route>

          <Route
            path="/dashboard/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/reset-password"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/vendor/reset-password"
            element={
              <ProtectedRoute>
                <ResetVendorPassword />
              </ProtectedRoute>
            }
          />
          <Route path="/vendor/dashboard" element={<VendorDashbaordLayout />} />
          <Route path="/station" element={<Slot />} />
          <Route path="/reset-password/" element={<SetNewPassword />} />
        </Route>
        <Route path="/time" element={<SignupModal />} />



        


        {/* responsive design */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
