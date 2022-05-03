import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/header/headerReducer';
import plpReducer from './reducers/plp/plpReducer';

const allReducers = combineReducers({
  headerReducer,
  plpReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
