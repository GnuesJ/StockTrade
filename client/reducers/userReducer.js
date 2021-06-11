import * as types from '../constants/userActionTypes';


const initialState = {
  firstName: '',
  lastName: '',
  buyPower: 0,
  totalInvested: 0,
  transactionHistory: [],
  stocks: [],
  totalStocks: 10000,
  virtualMoney: '',
};

const userReducer = (state = initialState, action) => {
  let totalStocks = 0;
  let buyPower;
  let transactionHistory = [];
  let stocks = [];
  // console.log('user action payload',action.payload);
  //history[] stockName symbol price quantity transaction date
  //stocks[] stockName symbol quantity
  switch (action.type) { //action.type = 'ADD_MARKET'
    case types.INIT_USER:
      action.payload.stocks.forEach((stock) => {
        totalStocks+=stock.quantity;
      })
      console.log('init user')
      return {
        ...state,
        firstName: action.payload.userInfo.firstName,
        lastName: action.payload.userInfo.lastName,
        buyPower: action.payload.userInfo.buyPower,
        totalInvested: action.payload.userInfo.totalInvested,
        transactionHistory: action.payload.transactionHistory,
        stocks: action.payload.stocks,
        totalStocks: totalStocks,
      }
    case types.ADD_BUYPOWER:
      let amount = state.virtualMoney === '' ? 0 : parseInt(state.virtualMoney)
      buyPower = state.buyPower + amount;
      return{
        ...state,
        buyPower: buyPower,
        virtualMoney: '',
      }
    case types.BUY_CRYPTO:
      // const [currencyName, symbol, price, quantity] = action.payload;
      const currencyName = action.payload.currencyName;
      const symbol = action.payload.symbol;
      const price = action.payload.price;
      const quantity = action.payload.quantity;
      console.log('before fetch  on buy ', currencyName, symbol, price, quantity)
      return{
        ...state,
        buyPower: state.buyPower - (price * quantity),
        totalInvested: state.totalInvested + (price * quantity),
        transactionHistory: action.payload.history,
        stocks: action.payload.stocks,
        totalStocks: state.totalStocks + quantity,
      }
        console.log('outside');
        // return state;
      case types.UPDATE_VIRTUALMONEY:
        return{
          ...state,
          virtualMoney: action.payload,
        }
    default: {
      return state
    }
  }
}

export default userReducer;


// fetch('/api/transactionhistory', {
//   method: 'POST', 
//   headers: {'Accept': 'application/json, text/plain, */*',
//   'Content-Type': 'application/json'},
//   body: JSON.stringify({stockName: 'blah', symbol: 'BL', price: '100', quantity: '6', transaction: 'buy'})})
//   .then(response => response.json())
//   .then()
//   .catch(err => console.log(err));