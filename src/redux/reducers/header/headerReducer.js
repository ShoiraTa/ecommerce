import actionType from '../actionTypes';

const initState = {
  currency: 'USD',
  symbol: '$',
  currencies: [],
};

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENCY:
      return { ...state, currency: action.payload.currency, symbol: action.payload.symbol };
    case actionType.GET_CURRENCY:
      return { ...state, currencies: action.payload };

    default:
      return state;
  }
};

export default headerReducer;
