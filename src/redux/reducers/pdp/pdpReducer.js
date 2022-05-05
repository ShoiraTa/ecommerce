import actionType from '../actionTypes';

const initState = {
  product: {},
  loading: true,
};

const pdpReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default pdpReducer;
