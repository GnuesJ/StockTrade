import { set } from 'mongoose';
import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../actions/userActions';
import UserCryptoDisplay from '../components/UserCryptoDisplay.jsx'
// import { addCount } from "./store/counter/actions";
// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const UserContainer = props => {
  // const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  // if(userInfo)
  //   string+=userInfo.firstName
  const firstName = useSelector(state => state.user.firstName);
  const lastName = useSelector(state => state.user.lastName);
  const buyPower = useSelector(state => state.user.buyPower);
  const totalInvested = useSelector(state => state.user.totalInvested);
  const userStocks = useSelector(state => state.user.stocks);
  const stocks = useSelector(state => state.crypto.stocks);
  const stockNames = useSelector(state => state.crypto.stockNames);
  const virtualMoney =  useSelector(state => state.user.virtualMoney);

  const [profitHistory, setProfitHistory] = React.useState([0,0,0,0,0,0,0,0,0,0]);
  const [time, setTime] = React.useState(performance.now())
  const [loopNum, setLoopNum] = React.useState(0);
  const [firstLoop, setFirstLoop] = React.useState(true);
  let netWorth = 0;
  // userStocks.forEach((stock) => {

  //   if(Object.keys(stocks).length !== 0){
  //     console.log('forloop',stocks);
  //     netWorth = stocks[stock.stockName].price * stock.quantity;
  //   }
  // })

  for(let i=0; i < userStocks.length; i++){
    if(Object.keys(stocks).length ===  0) break;
    netWorth += stocks[userStocks[i].stockName].price * userStocks[i].quantity;
  }
  // console.log(netWorth);

  let profit = netWorth - totalInvested
  if(netWorth === 0){
    profit = 0;
  }
  // let numProfit = profit;
  let num = parseFloat((profit).toFixed(4));
  profit = parseFloat((profit).toFixed(4));
// console.log('numProfit', parseFloat(profit).toFixed(2))
  let color;
  if(profit < 0){
    profit = ('- $' + Math.abs(profit))
    color = 'red';
  }
  else{
    profit = '$' + profit;
    color = 'lightgreen'
  }

  const updateVirtualMoneyHandler = (event) => {
    dispatch(userActions.updateVirtualMoneyCreator(event.target.value))
  }
  const addBuyPowerHandler = () => {
    fetch('/api/addBuyPower', {
      method: 'PATCH', 
      headers: {'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'},
      body: JSON.stringify({amount: virtualMoney})})
      .then(response => response.json())
      .then(data => {
        dispatch(userActions.addBuyPowerCreator())
      })
      .catch(err => console.log(err));
  }
  
  const [previousProfit, setPreviousProfit]  = React.useState(0);

  React.useEffect(()=> {
    // console.log('TIME', performance.now() - time);
    // if(performance.now() - time > 9500 || firstLoop){
    if(previousProfit !== num){
      setPreviousProfit(num);
      console.log('inside  useEffect num: ',num);
      // if(firstLoop) setFirstLoop(false);
      // setTime(performance.now());
      console.log('do something');
      const newProfitHistory = [];
      for(let i = 1; i < profitHistory.length; i++){
      newProfitHistory.push(profitHistory[i]);
    }
    // if(firstLoop){
    //   setFirstLoop(false);
    //   newProfitHistory.push(0);
    // }
    // else
      newProfitHistory.push(num);
    setProfitHistory(newProfitHistory)
    CanvasJS.addColorSet("white",
                [//colorSet Array

                "lime",
                "lime",
                "lime",
                "lime",
                "lime"                
                ]);
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: false,
      backgroundColor: 'black',
      colorSet: 'white',
      height: '250',
      width: '700',
      theme: "dark1",
      title:{
        text: "Profit"
      },
      // axisY:{
      //   valueFormatString: "#,###.####",
      // },
      data: [{        
        type: "line",
            indexLabelFontSize: 4,
        dataPoints: [
          { y: newProfitHistory[0] },
          { y: newProfitHistory[1] },
          { y: newProfitHistory[2] },
          { y: newProfitHistory[3] },
          { y: newProfitHistory[4] },
          { y: newProfitHistory[5] },
          { y: newProfitHistory[6] },
          { y: newProfitHistory[7] },
          { y: newProfitHistory[8] },
          { y: num },
        ]
      }]
    });
    chart.render();
    }
    
    // setLoopNum(loopNum + 1);
    console.log(loopNum);
    // if(loopNum === 6){
      // console.log('refresh')
    
    // setLoopNum(0);
    // }
  })

  const userCryptos = [];
  userStocks.forEach((stock => {
    let price  =  0;
    if(stocks[stock.stockName] !== undefined)  price = stocks[stock.stockName].price;
    userCryptos.push(<UserCryptoDisplay stockName={stock.stockName} symbol={stock.symbol} quantity={stock.quantity} price={price}/>)
  }))

  return(
    <div>
      <main style={{marginLeft: '30px'}}>
        {/* <h1>{firstName} {lastName}</h1>
        <h2>Buy Power: {buyPower}</h2>
        <h2>Total Invested: {totalInvested}</h2> */}
        <h1>{firstName} {lastName}</h1>
        <div className='userFlexBox'>
          <span className='userInfoContainer'>
            <div>
              <input type='Number' value={virtualMoney} onChange={updateVirtualMoneyHandler}></input>
              <button className='buyPowerButton' onClick={addBuyPowerHandler}>Add Virtual Money</button>
            </div>
            <h2>Buy Power: ${buyPower.toFixed(4)}</h2>
            <h2>Total Invested: ${totalInvested.toFixed(4)}</h2>
            <h2>Networth: ${netWorth.toFixed(4)}</h2>
            <h2 style={{color: color}}>Profit: {profit}</h2>
          </span>
          <span >
            <div id="chartContainer" style={{height: '100%'}, {width: '100%'}}></div>
          </span>
        </div>
        <div className='userCryptoDetailContainer'>
        {userCryptos}
        </div>
      </main>
    </div>
  )
}

export default UserContainer;