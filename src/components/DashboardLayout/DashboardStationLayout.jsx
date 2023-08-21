import React from 'react'
import DashboardLayout from './DashboardLayout'
import "./style.css"

const DashboardStationLayout = ({ className, header, subHeader, children }) => {
    const data = ["Discounts Rates", "Jingles Rates", "Paid Announcement Rates"]
    return (
        <DashboardLayout
            header={header}
        >
            <div className={`dashboard-station-container ${className}`} 
            
            >
                <h4>{subHeader}</h4>
                <div className='btn-option-wrapper'>
                    {data.map((btn, index) => {
                        return <button
                        onClick={()=> console.log(index)}
                        >{btn}</button>
                    })}
                </div>
                {children}
            </div>
        </DashboardLayout>
    )
}

export default DashboardStationLayout