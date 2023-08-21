import React from 'react'
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout'
import DashboardTable from '../../components/DashboardLayout/DashboardTable'
import "./css/advertiser-dashboard-station.css"


const AdvertiserDashCampaign = () => {
    const data = [
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
        {
            invoiceNo: "#467666",
            campaignName: "Awoof Data",
            companyName: "mtn",
            industry: "Entertainment",
            date: "mar 20th 2022",
            radioStation: "beat 99 fm",


        },
    ]
    return (
        <AdvertiserDashboardayout
            header="Agnes Hassan"
        >
            <div className='advertiser-dashboard-station'>
                {/* <h4>campaigns</h4> */}
                <DashboardTable title="campaigns" />
                <>
                    <div className="panel-body table-wrapper">
                        <table id="data-table" className="table table-striped table-bordered nowrap" width="100%">
                            <thead>
                                <tr>
                                    <th><input name="select_all" value="1" type="checkbox" /></th>
                                    <th>invoice no</th>
                                    <th>campaign name</th>
                                    <th>company name</th>
                                    <th>industry</th>
                                    <th>date</th>
                                    <th>radio station</th>

                                </tr>
                            </thead>
                            <tbody>

                                {data.map((info) => {
                                    return (
                                        <tr class="odd gradeX">
                                            <td><input type="checkbox" name="name1" /></td>
                                            <td>{info.invoiceNo}</td>
                                            <td>{info.campaignName}</td>
                                            <td>{info.companyName}</td>
                                            <td>{info.industry}</td>
                                            <td>{info.date}</td>
                                            <td>
                                                {info.radioStation}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                <span>Showing 1 to 3 of 3 entries</span>
            </div>
        </AdvertiserDashboardayout>

    )
}

export default AdvertiserDashCampaign