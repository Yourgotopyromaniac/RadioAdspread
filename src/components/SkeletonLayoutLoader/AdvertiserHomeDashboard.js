import React from 'react'
import { Skeleton } from "@chakra-ui/react"

const AdvertiserHomeDashboard = () => {
    return (
        <>
            <div className='dashboard-card-container'>
                <Skeleton width="200px" height="60px" />
                <Skeleton width="200px" height="60px" />
                <Skeleton width="200px" height="60px" />
            </div>
            <div
                className='dashboard-table-container skeleton-dashboard-table'>
                <Skeleton width="100px" height="20px" />
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Skeleton width="40px" height="20px" />
                            </th>
                            <th>
                                <Skeleton width="120px" height="20px" />
                            </th>
                            <th>
                                <Skeleton width="100px" height="20px" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Skeleton width="40px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="120px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="100px" height="20px" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Skeleton width="40px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="120px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="100px" height="20px" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Skeleton width="40px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="120px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="100px" height="20px" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Skeleton width="40px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="120px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="100px" height="20px" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Skeleton width="40px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="120px" height="20px" />
                            </td>
                            <td>
                                <Skeleton width="100px" height="20px" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default AdvertiserHomeDashboard