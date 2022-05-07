import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/header/headerReducer';
import pdpReducer from './reducers/pdp/pdpReducer';
import pricesReducer from './reducers/global/pricesReducer';
import cartReducer from './reducers/cart/cartReducer';

const allReducers = combineReducers({
  headerReducer,
  pdpReducer,
  pricesReducer,
  cartReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
