import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/header/headerReducer';
import plpReducer from './reducers/plp/plpReducer';
import pdpReducer from './reducers/pdp/pdpReducer';

const allReducers = combineReducers({
  headerReducer,
  plpReducer,
  pdpReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
