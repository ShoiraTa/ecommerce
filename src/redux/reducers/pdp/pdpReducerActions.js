import axios from 'axios';
import actionType from '../actionTypes';

const endpoint = 'http://localhost:4000';
const headers = {
  'content-type': 'application/json',
};

export const getProduct = (id) => async (dispatch) => {
  const fetchProduct = {
    operationName: 'fetchProduct',
    query: `query fetchProduct 
    {
      product(id: "${id}" ) {
        id
        name
        gallery
        description
        inStock
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
  }).then((response) => {
    dispatch({
      type: actionType.FETCH_PRODUCT,
      payload: response.data.data.product,
    });
  });
};
export const getCategoryProducts = (categoryName) => async (dispatch) => {
  const categoryProductsQuery = {
    operationName: 'fetchCurrencies',
    query: `query fetchCurrencies 
    {
      category(input: {title: "${categoryName}"}) {
        name
        products {
          id
          inStock
          name
          gallery
          brand
          attributes {
            id
              name
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
        }
      }
    }
    `,
    variables: {},
  };

  axios({
    url: endpoint,
    data: categoryProductsQuery,
    method: 'POST',
    headers,
  }).then((response) => {
    dispatch({
      type: actionType.FETCH_CATEGORY_PRODUCTS,
      payload: response.data.data.category.products,
    });
  });
};
