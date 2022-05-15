import actionType from '../actionTypes';

const initState = {
  currentCategory: 'all',
  categories: [],
};

const headerReducer = (state = initState, action) => {
  switch (action.type) {
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
