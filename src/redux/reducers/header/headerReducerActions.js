import actionType from '../actionTypes';

export const setCurrency = (currency, symbol) => ({
  type: actionType.SET_CURRENCY,
  payload: {
    currency,
    symbol,
  },
});

export const setCurrency2 = (currency, symbol) => {
  return {
    type: actionType.GET_CURRENCY,
    payload: {
      currency,
      symbol,
    },
  };
};
