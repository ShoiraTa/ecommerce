import actionType from '../actionTypes';

const initState = {
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
    default:
      return state;
  }
};

export default pdpReducer;
