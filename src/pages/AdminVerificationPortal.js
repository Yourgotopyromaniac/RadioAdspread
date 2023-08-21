import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Center, ChakraProvider, extendTheme, useDisclosure,
} from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons";
import Hamburger from "../pages/ResponsiveAdvertiserDashboard/assets/hamburger.svg"
import { TableSpinner } from '../components/Spinner';
import Logo from '../components/Logo';
import { AdminMenuList } from '../utils/constant'
import { useMutation, useQuery } from '@apollo/client';
import { GET_UNAPPROVED_BROADCASTERS } from '../components/GraphQL/Queries';
import { VERIFY_BROADCASTER_EMAIL } from '../components/GraphQL/Mutation';
import { APPROVE_BROADCASTER_EMAIL } from '../components/GraphQL/Mutation';
import { toast } from 'react-toastify';
import { EmptyState } from '../components/Modal/ScheduleModal';



const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme({ breakpoints });


const AdminVerificationPortal = () => {

  const { loading, data } = useQuery(GET_UNAPPROVED_BROADCASTERS);
  const [verifyBroadcasterEmail] = useMutation(VERIFY_BROADCASTER_EMAIL);
  const [approveBroadcaster] = useMutation(APPROVE_BROADCASTER_EMAIL);



  const handleVerification = (accountID) => {

    verifyBroadcasterEmail({
      variables: {
        verifyBroadcasterEmailId: accountID
      },

      onCompleted: () => {
        toast("Verification Successful,  refresh page to update");
      },

    });


  }

  const handleApproval = (accountID) => {

    approveBroadcaster({
      variables: {
        approveBroadcasterId: accountID
      },

      onCompleted: () => {
        toast("Approval Successful, refresh page to update");
      },

    });


  }

  const [openMobileMenu, setOpenMobileMenu] = useState(false);


  return (
    <ChakraProvider theme={theme}>
      <div className="advert-dashboard-layout">
        <nav>
          <div className="advert-dashboard-nav-container">
            <div className="nav-wrapper">
              <div>
                <Logo textColor="#FFFFFE" favColor="#FC9732" />
              </div>
              <div onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                <img src={Hamburger} alt="hamburger_icon" />
              </div>
            </div>

            <div className="advertiser-name">
              Admin Dashboard
            </div>
          </div>
          {openMobileMenu && (
            <div className="mobile-show-nav-menu-container">
              <div className="mobile-sidebar-wrapper">
                <div>
                  <Logo textColor="#FFFFFE" favColor="#FC9732" />
                </div>
                <div className="mobile-icon-wrapper">
                  <div onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <CloseIcon />
                  </div>
                </div>
              </div>
              <div className="mobile-sidebar-menu">
                {AdminMenuList.map(({ text, Icon, link, active }) => {
                  return (
                    <Link to={link}>
                      <div className={active ? "mobile-sidebat-item" : "inactive-menu-item"}>

                        <Icon />
                        <span>{text}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {data?.admin.getUnapprovedBroadcasters.length === 0 && (
            <EmptyState
              title="No Unapproved or Unverified Accounts"
              text="Unverified or Unapproved accounts will show up here when created"
              btnText="Refresh"
              route="/admin/verification-portal"
            />
          )}

          {loading ? (

            <ChakraProvider>
              <Center h="100vh">
                <TableSpinner />
              </Center>
            </ChakraProvider>
          ) : (data?.admin.getUnapprovedBroadcasters.length && (
            <TableContainer>
              <TableWrapper>
                <Table>
                  <Thead>
                    <TableHeaderRow>
                      <Th
                      >ID</Th>
                      <Th
                      >RADIO STATION</Th>
                      <Th
                      >EMAIL</Th>
                      <Th
                      >VERIFICATION</Th>
                      <Th
                      >APPROVAL</Th>
                      <Th
                      >ACTION</Th>
                    </TableHeaderRow>
                  </Thead>
                  <Tbody>
                    {data?.admin.getUnapprovedBroadcasters.map(({ id, radioStationName, email, isVerified, isApproved }) => {
                      return (

                        <TableBodyRow key={id}>
                          <Td
                          >{id}</Td>
                          <Td
                            color="#F99B28"
                          >{radioStationName}
                          </Td>
                          <Td
                          >{email}</Td>
                          <Td
                          ><span>{isVerified.toString()}</span></Td>
                          <Td
                          ><span>{isApproved.toString()}</span></Td>
                          <TableD
                          >
                            {isVerified ? (<div>verified</div>) : (<button onClick={() => handleVerification(id)}>Verify</button>)}

                            {isApproved ? (<div>Approved</div>) : (<button onClick={() => handleApproval(id)}>Approve</button>)}
                          </TableD>
                        </TableBodyRow>
                      )
                    })}
                  </Tbody>

                </Table>
              </TableWrapper>
            </TableContainer>
          ))
          }
      </div>

      <div className="desktop-dashboard-layout">

        <div className="dashboard-sidebar-container">
          <div>
            <Logo textColor="#FFFFFE" favColor="#FC9732" />
          </div>

          <div className="dashboard-sidebar-menu-items">
            {AdminMenuList.map(({ text, Icon, link, active }) => {
              return (

                <Link to={link}>
                  <div className={active ? "sidebar-menu-item" : "inactive-menu-item"}>
                    <Icon />
                    <span>{text}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="dashboard-nav-body-container">
          <nav>
            <div>
              Admin Dashboard
            </div>
          </nav>



          {data?.admin.getUnapprovedBroadcasters.length === 0 && (
            <EmptyState
              title="No Unapproved or Unverified Accounts"
              text="Unverified or Unapproved accounts will show up here when created"
              btnText="Refresh"
              route="/admin/verification-portal"
            />
          )}
          {loading ? (

            <ChakraProvider>
              <Center h="100vh">
                <TableSpinner />
              </Center>
            </ChakraProvider>
          ) : (data?.admin.getUnapprovedBroadcasters.length && (
            <TableContainer>
              <TableWrapper>
                <Table>
                  <Thead>
                    <TableHeaderRow>
                      <Th
                      >ID</Th>
                      <Th
                      >RADIO STATION</Th>
                      <Th
                      >EMAIL</Th>
                      <Th
                      >VERIFICATION</Th>
                      <Th
                      >APPROVAL</Th>
                      <Th
                      >ACTION</Th>
                    </TableHeaderRow>
                  </Thead>
                  <Tbody>
                    {data?.admin.getUnapprovedBroadcasters.map(({ id, radioStationName, email, isVerified, isApproved }) => {
                      return (

                        <TableBodyRow key={id}>
                          <Td
                          >{id}</Td>
                          <Td
                            color="#F99B28"
                          >{radioStationName}
                          </Td>
                          <Td
                          >{email}</Td>
                          <Td
                          ><span>{isVerified.toString()}</span></Td>
                          <Td
                          ><span>{isApproved.toString()}</span></Td>
                          <TableD
                          >
                            {isVerified ? (<div>verified</div>) : (<button onClick={() => handleVerification(id)}>Verify</button>)}

                            {isApproved ? (<div>Approved</div>) : (<button onClick={() => handleApproval(id)}>Approve</button>)}
                          </TableD>
                        </TableBodyRow>
                      )
                    })}
                  </Tbody>

                </Table>
              </TableWrapper>
            </TableContainer>
          ))
          }



        </div>

      </div>
    </ChakraProvider>
  );
};

export default AdminVerificationPortal;

const TableContainer = styled.div`
    padding-top: 50px;
    padding-left: 65px;
    padding-right: 30px;
`

const TableWrapper = styled.div`
    max-height: 500px;
    overflow-y: scroll;
    border: 1px solid #E8E8E8;
    width: 100%;
`

const TableHeaderRow = styled.tr`
    background: #EFF6F4;
    color: #004643;
    white-space: nowrap;
        & > th {
            letter-spacing: 0.02em;
            line-height: 20px;
            font-size: 14px;
            font-weight: 700;
            font-style: normal;
        }
`
const TableBodyRow = styled.tr`
    color: #004643;
    & > td {
           letter-spacing: 0.02em;
            line-height: 20px;
            font-size: 14px;
            font-weight: 400;
            font-style: normal;
            border-left : 1px solid #EFF6F4; 
            
            & span {
                background: #DFF9DC;
                border-radius: 15px;
                padding: 5px 20px;
            }
    }
`

const TableD = styled.td`
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    alig-items : center;
    & button {
      margin-left : 5px;
    }

    & div {
      width: 100%;
      padding: 10px 50px;
      background-color: #F99B28;
      color: #fff;
      cursor : not-allowed;
  }
`