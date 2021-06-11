import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";


const UserCryptoDisplay = props => {
  return(
  <div>
    <span className='userCryptoDetail'>{props.stockName}</span>
    <span className='userCryptoDetail'>{props.symbol}</span>
    <span className='userCryptoDetail'>${parseFloat(props.price).toFixed(4)}</span>
    <span className='userCryptoDetail'>{props.quantity}</span>
    <span className='userCryptoDetail'>${parseFloat(props.quantity * props.price).toFixed(4)}</span>
  </div>
  )
}

export default UserCryptoDisplay;