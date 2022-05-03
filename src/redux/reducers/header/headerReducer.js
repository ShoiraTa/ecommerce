import actionType from '../actionTypes';

const initState = {
  currentCurrency: {
    label: 'USD',
    symbol: '$',
  },
  currentCategory: 'all',
  currencies: [],
  categories: [],
};

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENCY:
      return {
        ...state,
        currentCurrency: { label: action.payload.currency, symbol: action.payload.symbol },
      };
    case actionType.FETCH_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
      };
    case actionType.SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case actionType.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default headerReducer;
