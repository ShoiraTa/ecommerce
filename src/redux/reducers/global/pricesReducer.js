import actionType from '../actionTypes';

const initState = {
  currentCurrency: {
    label: 'USD',
    symbol: '$',
  },
  productPrice: { amount: 0, label: '', symbol: '' },
};

const pricesReducer = (state = initState, action) => {
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
    case actionType.FETCH_PRODUCT_PRICE:
      return {
        ...state,
        productPrice: { amount: action.payload.amount, label: action.payload.label, symbol: action.payload.symbol },
      };

    default:
      return state;
  }
};

export default pricesReducer;
