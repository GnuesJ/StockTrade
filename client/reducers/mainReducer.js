import { combineReducers } from 'redux';

// import all reducers here
import userReducer from './userReducer';
import cryptoReducer from './cryptoReducer';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  user: userReducer,
  crypto: cryptoReducer,
});

// make the combined reducers available for import
export default reducers;
