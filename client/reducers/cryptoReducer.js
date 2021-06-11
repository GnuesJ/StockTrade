import * as types from '../constants/cryptoActionTypes';


const initialState = {
  stockNames : [],
  stocks : {},
};

const cryptoReducer = (state = initialState, action) => {
  const stocks = {};
  const stockNames = [];
  switch (action.type) { //action.type = 'ADD_MARKET'
    case types.INIT_CRYPTOMARKET:
      action.payload.forEach((crypto) => {
        stockNames.push(crypto.name);
        stocks[crypto.name] = {
          stockName: crypto.name,
          symbol: crypto.symbol,
          price: crypto.priceUsd,
          rank: crypto.rank,
          quantityMark: '',
        };
      })
      console.log('init cryptomarket action: ', stockNames);
      console.log('init cryptomarket action: ', stocks);
      return {
        stockNames: stockNames,
        stocks: stocks,
      }
    case types.UPDATE_CRYPTOMARKET:
      action.payload.forEach((crypto) => {
        if(state.stocks[crypto.name]){
          stocks[crypto.name] = {};
          stocks[crypto.name].price = crypto.priceUsd;
          stocks[crypto.name].stockName = state.stocks[crypto.name].stockName
          stocks[crypto.name].symbol = state.stocks[crypto.name].symbol
          stocks[crypto.name].rank = state.stocks[crypto.name].rank
          stocks[crypto.name].quantityMark = state.stocks[crypto.name].quantityMark
        }
      })
      return {
        ...state,
        stocks: stocks,
      }
    case types.UPDATE_QUANTITYMARK:
      // stocks = state.stocks;
      // stocks[action.payload.stockName].quantityMark = action.payload.quantityMark;
      stocks[action.payload.stockName] = {};
      stocks[action.payload.stockName].price =state.stocks[action.payload.stockName].price;
      stocks[action.payload.stockName].stockName = state.stocks[action.payload.stockName].stockName
      stocks[action.payload.stockName].symbol = state.stocks[action.payload.stockName].symbol;
      stocks[action.payload.stockName].rank = state.stocks[action.payload.stockName].rank;
      stocks[action.payload.stockName].quantityMark = action.payload.quantityMark;
      return{
        ...state,
        stocks: {...state.stocks, ...stocks},
      }
    case types.RESET_QUANTITYMARK:
      stocks[action.payload] = {};
      console.log('rest qua')
      stocks[action.payload].price =state.stocks[action.payload].price;
      stocks[action.payload].stockName = state.stocks[action.payload].stockName
      stocks[action.payload].symbol = state.stocks[action.payload].symbol;
      stocks[action.payload].rank = state.stocks[action.payload].rank;
      stocks[action.payload].quantityMark = '';
      return{
        ...state,
        stocks: {...state.stocks, ...stocks},
      }
    default: {
      return state;
    }
  }

  
}

export default cryptoReducer;