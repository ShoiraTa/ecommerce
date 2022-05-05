import actionType from '../actionTypes';

const initState = {
  product: {},
  pdpLoading: true,
  products: [],
};

const pdpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        pdpLoading: false,
      };
    case actionType.FETCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        pdpLoading: false,
      };
    default:
      return state;
  }
};

export default pdpReducer;
