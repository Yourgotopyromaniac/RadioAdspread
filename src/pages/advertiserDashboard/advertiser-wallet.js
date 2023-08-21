import React from 'react'

import DashboardTable from '../../components/DashboardLayout/DashboardTable'

import CardTwo from "../../assets/icons/card-two.svg"
import CardThree from "../../assets/icons/card-three.svg"
import "./css/wallet-advertiser.css"
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout'

const AdvertiserWallet = () => {
    const data = [
        {
            transactionDate: "Mar 28th 2022",
            transactionId: "324534",
            amount: "₦2,741.25",
            type: "₦2,741.25",
            paymentMethod: "Flutterwave",
            description: "account top up"
        },
        {
            transactionDate: "Mar 28th 2022",
            transactionId: "324534",
            amount: "₦2,741.25",
            type: "₦2,741.25",
            paymentMethod: "Flutterwave",
            description: "account top up"
        },
        {
            transactionDate: "Mar 28th 2022",
            transactionId: "324534",
            amount: "₦2,741.25",
            type: "₦2,741.25",
            paymentMethod: "Flutterwave",
            description: "account top up"
        },
        {
            transactionDate: "Mar 28th 2022",
            transactionId: "324534",
            amount: "₦2,741.25",
            type: "₦2,741.25",
            paymentMethod: "Flutterwave",
            description: "account top up"
        },
    ]
  return (
<AdvertiserDashboardayout
header="Hassan Agnes"
>
            <div className="campaign-container">
                {/* <div className="campaign-sub-header">
                        <h3>campaign details</h3>
                        <h4>wallet balance: <span>NGN 1,000</span></h4>
                    </div>  */}
                <div>
                    <div className='wallet-header'>
                        <h4>wallet</h4>
                        <div>
                            <div>current balance: <span>₦44, 902:00</span></div>
                            <div>pending amount:  <span>₦4,000.000</span></div>
                        </div>
                    </div>
                    <div className='campaign-form-card-wrapper'>
                        {/* <h4>Select your preffered payment method</h4> */}
                        <div className='payment-card-wrapper'>

                            <div>
                                <div>
                                    <img src={CardTwo} 
                                    alt='paystack-icon'
                                    />

                                </div>
                                <span> Pay with Paystack</span>
                               
                            </div>
                            <div>
                                <div>
                                    <img src={CardThree} 
                                    alt='flutter-icon'
                                    />

                                </div>
                                <span>Pay with Flutterwave</span>
                                
                            </div>
                        </div>
                        <div className='amount_input_wrap'>
                            <label htmlFor="campaign_name">Amount:</label>
                            <input type="text" placeholder="Enter an amount" />
                        </div>
                        <button>proceed</button>

                    </div>
                </div>
            </div>
            <div className='wallet-table-container'>
                <DashboardTable title="transaction history" />
                <div className="panel-body table-wrapper">
                    <table id="data-table" className="table table-striped table-bordered nowrap" width="100%">
                        <thead>
                            <tr>
                                <th><input name="select_all" value="1" type="checkbox" /></th>
                                <th>Transaction Date</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>type</th>
                                <th>paymentMethod</th>
                                <th>Description</th>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((info) => {
                                return (
                                    <tr class="odd gradeX">
                                        <td><input type="checkbox" name="name1" /></td>
                                        <td>{info.transactionDate}</td>
                                        <td>{info.transactionId}</td>
                                        <td>{info.amount}</td>
                                        <td>{info.type}</td>
                                        <td>{info.paymentMethod}</td>
                                        <td>
                                            {info.description}
                                        </td>
                                      
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

</AdvertiserDashboardayout>


              
    
    )
}

export default AdvertiserWallet;