import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import headerReducer from './reducers/header/headerReducer';

const allReducers = combineReducers({
  headerReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
