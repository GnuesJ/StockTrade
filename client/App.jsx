import React, { Component } from 'react';
import * as userActions from './actions/userActions';
import * as cryptoActions from './actions/cryptoActions';
import UserContainer from './containers/UserContainer.jsx';
import CryptoMarketContainer from './containers/CryptoMarketContainer.jsx'
import { useDispatch, useSelector } from "react-redux";
// import { Switch, Route } from 'react-router-dom';
// import MainContainer from './containers/MainContainer.jsx';

const App = props => {
  const dispatch = useDispatch();
  // const [firstName, setFirstName] = React.useState();
  // const [lastName, setLastName] = React.useState();
  // const [buyPower, setBuyPower] = React.useState();
  // const [currencies, setCurrencies] = React.useState();
  // const count = useSelector(state => state.counter.count);
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   console.log('fetching app')
  //   fetch('/api/user', {method: 'GET'})
  //     .then(response => response.json())
  //     .then(data => {
  //       setFirstName(data.firstName);
  //       setLastName(data.lastName);
  //       setBuyPower(data.buyPower);
  //       setTotalInvested(data.totalInvested);
  //     })
  //     .catch();
  // })
  React.useEffect(() => {
    fetch('https://api.coincap.io/v2/assets', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        dispatch(cryptoActions.initCryptoMarketCreator(data.data))
        // setCurrencies(JSON.stringify(data));
      })
      .catch(err => console.log(err));
  })




  React.useEffect(() => {
    // fetch('/api/transactionhistory', {
    //   method: 'POST', 
    //   headers: {'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'},
    //   body: JSON.stringify({stockName: 'blah', symbol: 'BL', price: '100', quantity: '6', transaction: 'buy'})})
    //   .then(response => response.json())
    //   .then()
    //   .catch(err => console.log(err));



    fetch('/api/user', {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log('user', data.user);
        console.log('transactionHistory',data.transactionHistory);
        console.log('userStock', data.userStock);
        const user = data.user;
        const transactionHistory = data.transactionHistory.history
        const stocks = data.userStock.stocks;
        //transactionHistory user userStock
        //history[] stockName symbol price quantity transaction date
        //stocks[] stockName symbol quantity
        // setCurrencies(JSON.stringify(data));
        dispatch(userActions.initUserCreator(user, transactionHistory, stocks))
      })
      .catch(err => console.log(err));
  })
  
  return(
    <div>
      <main>
        <UserContainer />
        <CryptoMarketContainer />
      </main>
    </div>
  )
}

export default App;
// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return(
//       <div>asdas
//       </div>
//     );
//   }
// }



//<MainContainer />