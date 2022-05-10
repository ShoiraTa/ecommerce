import actionType from '../actionTypes';

const initState = {
  pricesLoading: true,
  currentCurrency: {
    label: 'USD',
    symbol: '$',
  },
  productPrice: [],
};

const pricesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_CURRENCY:
      return {
        ...state,
        currentCurrency: { label: action.payload.currency, symbol: action.payload.symbol },
        pricesLoading: false,
      };
    case actionType.FETCH_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
        pricesLoading: false,
      };
    case actionType.FETCH_PRODUCT_PRICE:
      const price = action.payload.prices.filter((price) => price.currency.label === action.payload.currency);
      return {
        ...state,
        productPrice: {
          ...state.productPrice,
          [action.payload.id]: {
            amount: price[0].amount,
            label: price[0].currency.label,
            symbol: price[0].currency.symbol,
            id: action.payload.id,
          },
        },
        pricesLoading: false,
      };
    default:
      return state;
  }
};

export default pricesReducer;
