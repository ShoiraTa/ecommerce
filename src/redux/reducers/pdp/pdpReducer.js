import actionType from '../actionTypes';

const initState = {
  product: {},
  productLoading: true,
  products: [],
  productsLoading: true,
};

const pdpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        productLoading: false,
      };
    case actionType.FETCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsLoading: false,
      };
    default:
      return state;
  }
};

export default pdpReducer;
