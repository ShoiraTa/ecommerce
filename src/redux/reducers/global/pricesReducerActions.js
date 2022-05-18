import axios from 'axios';
import actionType from '../actionTypes';

const endpoint = 'http://localhost:4000';
const headers = {
  'content-type': 'application/json',
};
export const setCurrency = (currency, symbol) => ({
  type: actionType.SET_CURRENCY,
  payload: {
    currency,
    symbol,
  },
});

export const getCurrencies = async (dispatch) => {
  const currencyQuery = {
    operationName: 'fetchCurrencies',
    query: 'query fetchCurrencies { currencies { label symbol } }',
    variables: {},
  };
  axios({
    url: endpoint,
    data: currencyQuery,
    method: 'POST',
    headers,
  }).then((response) => {
    dispatch({ type: actionType.FETCH_CURRENCY, payload: response.data.data.currencies });
  });
};

export const getProductPrice = (data) => async (dispatch) => {
  const getProductPrice = {
    operationName: 'getProductPrice',
    query: `query getProductPrice 
    { product(id: "${data.id}" ) {
        id
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    `,
    variables: {},
  };

  axios({
    url: endpoint,
    data: getProductPrice,
    method: 'POST',
    headers,
  }).then((response) => {
    dispatch({
      type: actionType.FETCH_PRODUCT_PRICE,
      payload: {
        prices: response.data.data.product.prices,
        currency: data.currency,
        id: data.id,
      },
    });
  });
};
