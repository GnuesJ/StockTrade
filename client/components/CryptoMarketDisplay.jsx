import React, { Component } from 'react';

// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const CryptoMarketDisplay = props => {

  return(
    <div className='cryptoDetail'>
      <span className='stockName'>{props.stockName}</span>
      <span className='otherDetail'>{props.symbol}</span>
      <span className='otherDetail'>${parseFloat(props.price).toFixed(4)}</span>
      <input className='quantityInput' type='number' value={props.quantity} onChange={props.updateQuantityCreator}></input>
      <button className='buyButton' onClick={props.addCryptoCreator}>BUY</button>
    </div>
  )
}


export default CryptoMarketDisplay;