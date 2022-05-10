import actionType from '../actionTypes';

const initState = {
  products: [],
  total: 0,
  totalQty: 0,
  tax: 21,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      console.log(action.payload);
      return {
        ...state,
        products: [...state.products, action.payload],
        totalQty: state.totalQty + 1,
      };

    case actionType.CART_UPDATE_PRODUCT_QTY:
      const index = state.products.findIndex((product) => product.selected.id === action.payload.id);
      let newProducts = [...state.products];
      if (action.payload.action === 'add') {
        newProducts[index].selected.qty += 1;
      } else if (action.payload.action === 'substract') {
        newProducts[index].selected.qty -= 1;
      }

      if (newProducts[index].selected.qty < 1) {
        newProducts = newProducts.filter((product) => product.selected.id !== action.payload.id);
      }

      const totalItems = newProducts.reduce((t, item) => {
        t += item.selected.qty;
        return t;
      }, 0);

      return {
        ...state,
        products: newProducts,
        totalQty: totalItems,
      };

    case actionType.GET_TOTAL:
      const total = state.products.reduce((t, product) => {
        const { qty } = product.selected;
        product.product.prices.forEach((item) => {
          if (item.currency.symbol === action.payload) {
            t += item.amount;
          }
        });
        return t * qty;
      }, 0);
      return {
        ...state,
        total: { total, symbol: action.payload },
      };

    default:
      return state;
  }
};

export default cartReducer;
