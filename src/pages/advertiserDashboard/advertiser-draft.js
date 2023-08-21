import React from 'react'
import { Link } from 'react-router-dom';
import AdvertiserDashboardayout from '../../components/DashboardLayout/AdvertiserDashboardayout';
import DashboardTable from '../../components/DashboardLayout/DashboardTable';
import "./css/advertiser-draft.css"

const Advertiserdraft = () => {
    const data = [
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
        {
            date: "Mar 28th 2022",
            vendors: "Classic FM 97.3",
            noOfVendors: "2",
            type: "jingles",
            language: "Yoruba",
            duration: "60Sec",
            slots: "16",
            subTotal: "₦2,741.25"
        },
    ]
  return (
    <AdvertiserDashboardayout
    header= "Agnes Hassan"
    >
<div className='advertiser-draft-container'>
    <DashboardTable title="drafts" />
    <div className="panel-body table-wrapper">
                        <table id="data-table" className="table table-striped table-bordered nowrap" width="100%">
                            <thead>
                                <tr>
                                    <th><input name="select_all" value="1" type="checkbox" /></th>
                                    <th>date</th>
                                    <th>vendors</th>
                                    <th>type</th>
                                    <th>language</th>
                                    <th>duration</th>
                                    <th>slots</th>
                                    <th>subtotal</th>
                                    <th colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {data.map((info) => {
                                    console.log(info)
                                    return (
                                        <tr class="odd gradeX">
                                            <td><input type="checkbox" name="name1" /></td>
                                            <td>{info.date}</td>
                                            <td>{info.vendors}</td>
                                            <td>{info.type}</td>
                                            <td>{info.language}</td>
                                            <td>{info.duration}</td>
                                            <td>
                                                {info.slots}
                                            </td>
                                            <td>
                                                {info.subTotal}
                                            </td>
                                            
                                            <td>
                                              <Link to='/'>
                                                proceed to checkout         </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <span>Showing 1 to 3 of 3 entries</span>
</div>
    </AdvertiserDashboardayout>
  )
}

export default Advertiserdraft;
