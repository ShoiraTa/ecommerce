import actionType from '../actionTypes';

const initState = {
  products: [],
  total: 0,
  totalQty: 0,
  tax: 21,
  minicartIsOpen: false,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      const productsArr = state.products.filter((product) => product.selected.id === action.payload.selected.id);
      let dublicate = false;
      let dub = {};

      productsArr.forEach((product) => {
        const index = state.products.findIndex((prod) => prod.selected.selectedId === product.selected.selectedId);
        dub = { ...dub, [product.selected.selectedId]: [true, index] };
        action.payload.selected.selectedAttrtibutes.forEach((selectedAttr) => {
          product.selected.selectedAttrtibutes.forEach((attribute) => {
            if (selectedAttr.label === attribute.label) {
              if (selectedAttr.selected !== attribute.selected) {
                dub = { ...dub, [product.selected.selectedId]: [false, index] };
              }
            }
          });
        });
      });
      Object.values(dub).forEach((val) => {
        if (val[0] === true) {
          state.products[val[1]].selected.qty += 1;
          dublicate = true;
        }
      });

      return {
        ...state,
        products: dublicate ? [...state.products] : [...state.products, action.payload],
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
    case actionType.TOGGLE_MINICART:
      return {
        ...state,
        minicartIsOpen: !state.minicartIsOpen,
      };
    default:
      return state;
  }
};

export default cartReducer;
