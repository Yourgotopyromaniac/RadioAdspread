import React from 'react'
import "./css/payment-modal.css"

const PaymentModal = () => {
    return (
        <div className='payment-modal-container'>
            <div className='modal-gif-wrapper'>
                <img src="" alt="" />
            </div>
            <h3>Insufficient Wallet Balance</h3>
            <p>There is not enough money in your wallet to proceed with the transaction. </p>
            <div className='modal-btn-wrapper'>
                <button>back to dashboard</button>
                <button>Fund Your Wallet</button>
            </div>
        </div>
    )
}

export default PaymentModal;