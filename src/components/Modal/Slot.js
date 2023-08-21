import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { BOOK_SLOTS } from '../GraphQL/Mutation';
import { BROADCASTER_SLOTS } from '../GraphQL/Queries';
import { toast } from 'react-toastify';

import "./style.css"

const Slot = ({ hoursArr, closeModal, broadcasterId, quantity, date, advertType, SlotInfo, a, b, checkStatus, inputSlotData }) => {

    // const [bookSlots, { error }] = useMutation(BOOK_SLOTS)
    const { data } = useQuery(BROADCASTER_SLOTS, {
        variables: {
            broadcasterId: broadcasterId
        }
    })

    const [slotId, setSlotId] = useState(null)
    const [quantities, setQuantities] = useState(0)
    const [isCheck, setIsCheck] = useState(false)


    // const [slotData, setSlotData] = useState([{
    //     id: slotId,
    //     slotQuantity: "",
    //     date: new Date(`'${date.year}-${date.month}-${date.day}'`),
    //     broadcasterId: broadcasterId,
    //     advertType: advertType

    // }])


    const { year, month, day } = date

    // const [slotInfos, setSlotInfos] = useState([{
    //     id: null,
    //     quantity: 0,
    //     advertType: `${advertType.advertType}${advertType.duration}`,
    //     broadcasterId: broadcasterId,
    //     language: advertType.language,
    //     date: new Date(`'${year}-${month}-${day}'`)

    // }])

    const [inputData, setInputData] = useState([])
    const [quantityVal, setQuantityVal] = useState(0)

    const handleChange = (e, slotId) => {
        const slotData = {
            slotId: slotId,
            quantity: +e.target.value,
            broadcasterId: broadcasterId,
            language: advertType.language,
            advertType: `${advertType.advertType}${advertType.duration}`,
            date: new Date(`'${year}-${month}-${day}'`)

        }
        const findData = inputData.some((data) => data.slotId === slotId)
        if (!findData) {
            setInputData([...inputData, slotData])
        } else {
            const newData = inputData.map((data) => {
                if (slotId === data.slotId) {
                    return { ...data, quantity: +e.target.value };
                }
                return data
            })
            setInputData(newData)
        }

    }

    //convert new Date time to localTimeString
    function tConvert(date) {
        const obj = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return new Date(date).toLocaleTimeString("en-US", obj);
    }


    hoursArr(quantityVal)
    a(slotId)
    b(quantities)

    const addSlot = () => {
        if (inputData) {
            const slotQuantityArr = inputData.map((qty) => {
                return qty.quantity
            })
            const totalSlots = slotQuantityArr.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            )
            setQuantityVal(totalSlots)
            inputSlotData(inputData)
            setTimeout(() => {
                closeModal(false)
            }, 2000);

        }
    }
checkStatus(isCheck)

    return (
        <div className='slot-modal-wrapper'>
            <div className='slot-container'>
                <div className='cancel-icon-wrapper'
                    onClick={() => { closeModal(false) }}
                >
                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1558_2136)">
                            <path d="M14.25 4.25L4.75 12.75" stroke="#0E0E2C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.75 4.25L14.25 12.75" stroke="#0E0E2C" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1558_2136">
                                <rect width="19" height="17" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <h4>Input Slot Numbers for {date.day} {date.monthName}, {date.year}</h4>
                <div className='slot-time-wrapper'>
                    {data?.guest.getBroadcasterSlots.map(({ id, startTime, endTime }) => {
                        return <div key={id} onClick={() => setSlotId(id)}>

                            <button>{tConvert(startTime)}:{tConvert(endTime)}</button>
                            <input
                                id={id}
                                type='text'
                                name={id}
                                placeholder='Enter Slot no'
                                onChange={(e) => handleChange(e, id)}
                            />
                        </div>
                    })}
                </div>

                <div className='agreement-wrapper' onClick={()=> 
                    setIsCheck(!isCheck)}>
                    <input type='checkbox' checked={isCheck}/>
                    <span>The spots and slot numbers should be duplicated across all dates</span>
                </div>
                <div className='agreement-btn'>
                    <button onClick={() => addSlot()}>Save and Continue</button>

                </div>
            </div>
        </div>
    )
}

export default Slot;