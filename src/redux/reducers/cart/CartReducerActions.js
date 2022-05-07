import axios from 'axios';
import actionType from '../actionTypes';

const endpoint = 'http://localhost:4000';
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
      console.log(response);
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
// name: props.name,
// brand: props.brand,
// prices: props.prices,
// id: props.id,
// productAttributes: props.attributes,
// qty: 1,

export const fn = () => {};
