import * as types from '../constants/cryptoActionTypes';

export const initCryptoMarketCreator = cryptoMarket => ({
  type: types.INIT_CRYPTOMARKET,
  payload: cryptoMarket,
})

export const updateCryptoMarketCreator = cryptoMarket => ({
  type: types.UPDATE_CRYPTOMARKET,
  payload: cryptoMarket,
});

export const updateQuantityCreator = (stockName, quantityMark) => ({
  type: types.UPDATE_QUANTITYMARK,
  payload: {stockName: stockName, quantityMark: quantityMark},
})

export const resetQuantityCreator = stockName => ({
  type: types.RESET_QUANTITYMARK,
  payload: stockName,
})