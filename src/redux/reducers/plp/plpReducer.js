import actionType from '../actionTypes';

const initState = {
  products: [],
};

const plpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default plpReducer;
