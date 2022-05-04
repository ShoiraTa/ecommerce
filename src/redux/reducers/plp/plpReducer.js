import actionType from '../actionTypes';

const initState = {
  products: [],
  prices: [],
};

const plpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionType.FETCH_PRODUCT_PRICES:
      return {
        ...state,
        prices: action.payload,
      };

    default:
      return state;
  }
};

export default plpReducer;
