import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as cryptoActions from '../actions/cryptoActions';
import * as userActions from '../actions/userActions';
import CryptoMarketDisplay from '../components/CryptoMarketDisplay.jsx';
import regeneratorRuntime from "regenerator-runtime";
// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const CurrencyMarketContainer = props => {
  const stockNames = useSelector(state => state.crypto.stockNames);
  const stocks = useSelector(state => state.crypto.stocks);
  const buyPower = useSelector(state => state.user.buyPower);
  const dispatch = useDispatch();
  const [something, setData] = React.useState();

  // const [s1, setS1] = React.useState(); [1,2,3,4,5]
  // const [index, setIndex] = 
  // const [s2, setS2] = React.useState(); []
  React.useEffect(() => {

    // remove first  element from s1
    // if(index < s1.length)
    // setTime(s2.push(s1[index]),3000)
    // fetch('https://api.coincap.io/v2/assets', {method: 'GET'})
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data.timestamp)
    //     dispatch(cryptoActions.updateCryptoMarketCreator(data.data))
    //     setData(data);
    //   })
    //   .catch(err => console.log(err));
    // setTimeout(() => {
    setTimeout(()=>{
      // console.log('hege');
    fetch('https://api.coincap.io/v2/assets', {method: 'GET'})
      .then(async response => await response.json().then(data => {
        // console.log(data.timestamp)
        const result = data.data;
        dispatch(cryptoActions.updateCryptoMarketCreator(result))
        new Promise(resolve => setTimeout(resolve, 3000))

        // setData(JSON.stringify(data));
      }))
      .catch(err => console.log(err));
    }, 3000)
  // }, 1000)
  });

  // const handler = (event) => {
  //   console.log(event.target.value);
  //   // (stockName, quantity) => dispatch(cryptoActions.updateQuantityCreator(stockName, quantity))
  // }
  let cryptoMarketDisplays = [];
  for(let i = 0; i < stockNames.length; i++){
    let stock = stocks[stockNames[i]];
    let blah = 2;
    const updateQuantityCreator = (event) => {
      dispatch(cryptoActions.updateQuantityCreator(stockNames[i], event.target.value))
    }
    const addCryptoCreator = () => {
      if(stock.price * stock.quantityMark  > buyPower){
        alert('You are BROKE. OH NO!')
      }
      else{
        console.log('testing bug',stock);
        fetch('/api/transaction', {
          method: 'POST', 
          headers: {'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'},
          body: JSON.stringify({stockName: stock.stockName, symbol: stock.symbol, price: stock.price, quantity: stock.quantityMark, transaction: 'buy'})})
          .then(response => response.json())
          .then(data => {
            console.log('inside handler', stockNames[i])
            dispatch(userActions.addCryptoCreator(stock.stockName, stock.symbol, stock.price, stock.quantityMark, data.transactionHistory.history, data.userStock.stocks));
            dispatch(cryptoActions.resetQuantityCreator(stockNames[i]))
          })
          .catch(err => console.log(err));
      }
    }
    //currencyName, symbol, price, quantity
    if(Object.keys(stock).length !== 0)
      cryptoMarketDisplays.push(<CryptoMarketDisplay stockName={stock.stockName} symbol={stock.symbol} price={stock.price} quantity={stock.quantityMark} updateQuantityCreator={updateQuantityCreator} addCryptoCreator={addCryptoCreator}/>)
  }
  // let componenet = []
  // for(run for s1.length)
  //   add to our componenet
  // console.log(data);
  return(
    <div>
      <main>
        {/* {component} */}
        <div className='detailTitle'>
          <span className='stockName'>Crypto Name</span>
          <span className='otherDetail'>Symbol</span>
          <span className='otherDetail'>Price</span>
          <span className='otherDetail'></span>
          <span className='buyButton'></span>
        </div>
        {cryptoMarketDisplays}
      </main>
    </div>
  )
}


export default CurrencyMarketContainer;
