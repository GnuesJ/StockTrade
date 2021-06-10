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
          quantityMark: 0,
        };
      })
      return {
        stockNames: stockNames,
        stocks: stocks,
      }
    case types.UPDATE_CRYPTOMARKET:
      stocks = state.stocks;
      action.payload.forEach((crypto) => {
        if(stocks[crypto.name]){
          stocks[crypto.name].price = crypto.priceUsd;
        }
      })
      return {
        ...state,
        stocks,
      }
    case types.UPDATE_QUANTITYMARK:
      stocks = state.stocks;
      stocks[types.payload.stockName].quantityMark;
      return{
        ...state,
        stocks,
      }
    case types.RESET_QUANTITYMARK:

    default: {
      return state;
    }
  }

  
}

export default cryptoReducer;