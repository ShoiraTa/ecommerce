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

export const setCategory = (category) => ({
  type: actionType.SET_CATEGORY,
  payload: category,
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

export const getCategories = async (dispatch) => {
  const categoryQuery = {
    operationName: 'fetchCurrencies',
    query: 'query fetchCurrencies { categories { name } }',
    variables: {},
  };

  axios({
    url: endpoint,
    data: categoryQuery,
    method: 'POST',
    headers,
  }).then((response) => {
    dispatch({ type: actionType.FETCH_CATEGORIES, payload: response.data.data.categories });
  });
};
