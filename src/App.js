import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "./constant";
import ContextFile from "./bookCampaign/pages/contextFile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "./config/url";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  const httpLink = createUploadLink({
    uri: URL,
  });

  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const logoutLink = onError(({ networkError }) => {
    if (
      networkError?.statusCode === 401 &&
      networkError?.result?.errors[0]?.message !==
        "Incorrect Email or Password" &&
      networkError?.result?.errors[0]?.message !== "Account not approved"
    ) {
      toast.error(networkError?.result?.errors[0]?.message, {
        hideProgressBar: true,
        duration: 1000,
        position: "top-center",
        style: { width: "100%" },
      });
      navigate("/");
    }
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
        "Apollo-Require-Preflight": "true",
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, logoutLink, httpLink]),
    fetchOptions: {
      mode: "no-cors",
    },
    cache: new InMemoryCache(),
  });

  return (
    <ContextFile>
      <ApolloProvider client={client}>
        <div className="App">
          <ScrollToTop />
          <ToastContainer />
          <Outlet />
        </div>
      </ApolloProvider>
    </ContextFile>
  );
}

export default App;
