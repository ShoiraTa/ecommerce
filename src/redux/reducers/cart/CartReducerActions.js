import axios from 'axios';
import actionType from '../actionTypes';

const endpoint = 'https://e-commerce-endpoints1.herokuapp.com/';
const headers = {
  'content-type': 'application/json',
};

export const addProductToCart = (product) => async (dispatch) => {
  const fetchProduct = {
    operationName: 'fetchProduct',
    query: `query fetchProduct 
    {
      product(id: "${product.id}" ) {
        id
        name
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    `,
    variables: {},
  };

  axios({
    url: endpoint,
    data: fetchProduct,
    method: 'POST',
    headers,
  })
    .then((response) => {
      dispatch({
        type: actionType.ADD_TO_CART,
        payload: {
          product: response.data.data.product,
          selected: product,
        },
      });
    })
    .catch((error) => console.log(error));
};

export const updateQty = (selectedId, action) => ({
  type: actionType.CART_UPDATE_PRODUCT_QTY,
  payload: { action, selectedId },
});

export const getTotal = (label) => ({
  type: actionType.GET_TOTAL,
  payload: label,
});

export const toggleMinicart = () => ({
  type: actionType.TOGGLE_MINICART,
});
