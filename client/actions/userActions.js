import * as types from '../constants/userActionTypes';

export const initUserCreator = (userInfo, transactionHistory, stocks) => ({
  type: types.INIT_USER,
  payload: {userInfo: userInfo, transactionHistory: transactionHistory, stocks: stocks},
})

export const addBuyPowerCreator = () => ({
  type: types.ADD_BUYPOWER,
});

export const addCryptoCreator = (currencyName, symbol, price, quantity, history, stocks) => ({
  type: types.BUY_CRYPTO,
  payload: {currencyName: currencyName, symbol: symbol, price: price, quantity: quantity, history: history, stocks: stocks},
});

export const sellCryptoCreator = (currencyName, symbol, price, quantity) => ({
  type: types.SELL_CRYPTO,
  payload: {currencyName: currencyName, symbol: symbol, price: price, quantity: quantity},
});

export const updateVirtualMoneyCreator = (virtualMoney) => ({
  type: types.UPDATE_VIRTUALMONEY,
  payload: virtualMoney,
})