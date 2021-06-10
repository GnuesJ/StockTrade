import * as types from '../constants/userActionTypes';

export const addBuyPowerCreator = marketId => ({
  type: types.ADD_BUYPOWER,
  payload: marketId,
});

export const addCryptoCreator = (currencyName, symbol, price, quantity) => ({
  type: types.BUY_CRYPTO,
  payload: {currencyName: currencyName, symbol: symbol, price: price, quantity: quantity},
});

export const sellCryptoCreator = (currencyName, symbol, price, quantity) => ({
  type: types.SELL_CRYPTO,
  payload: {currencyName: currencyName, symbol: symbol, price: price, quantity: quantity},
});