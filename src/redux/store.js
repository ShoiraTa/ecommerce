import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/header/headerReducer';
import pdpReducer from './reducers/pdp/pdpReducer';
import pricesReducer from './reducers/global/pricesReducer';

const allReducers = combineReducers({
  headerReducer,
  pdpReducer,
  pricesReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));
// store.subscribe(() => {
//   if (store.getState().pricesReducer.currentCurrency.label !== 'USD') {
//     console.log('subscribed for counter actions', store.getState());
//   }
// });
export default store;
