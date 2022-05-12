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
      const idx = state.products.findIndex((product) => product.selected.id === action.payload.selected.id);
      const newArr = [...state.products];

      let dublicate = false;
      if (idx >= 0) {
        state.products[idx].selected.selectedAttrtibutes.forEach((attribute) => {
          action.payload.selected.selectedAttrtibutes.forEach((selectedAttr) => {
            if (selectedAttr.label === attribute.label) {
              if (selectedAttr.selected === attribute.selected) dublicate = true;
            }
          });
        });
        if (dublicate === true) {
          newArr[idx].selected.qty += 1;
          return {
            ...state,
            products: newArr,
            totalQty: state.totalQty + 1,
          };
        }
      }

      return {
        ...state,
        products: [...state.products, action.payload],
        totalQty: state.totalQty + 1,
      };

    case actionType.CART_UPDATE_PRODUCT_QTY:
      const index = state.products.findIndex((product) => {
        return product.selected.selectedId === action.payload.selectedId;
      });

      let newProducts = [...state.products];
      if (action.payload.action === 'add') {
        newProducts[index].selected.qty += 1;
      } else if (action.payload.action === 'substract') {
        newProducts[index].selected.qty -= 1;
      }

      if (newProducts[index].selected.qty < 1) {
        newProducts = newProducts.filter((product) => product.selected.selectedId !== action.payload.selectedId);
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
