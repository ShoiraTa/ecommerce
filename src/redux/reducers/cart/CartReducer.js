import actionType from '../actionTypes';

const initState = {
  products: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case actionType.CART_UPDATE_PRODUCT_QTY:
      const product = state.products.filter((product) => {
        return product.selected.id === action.payload.id;
      });
      console.log(product[0].selected.qty);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default cartReducer;
