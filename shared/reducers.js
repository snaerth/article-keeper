import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import authReducer from './components/auth/reducer';
import commonReducer from './common/reducer';

const rootReducer = combineReducers({
  common: commonReducer,
  form,
  auth: authReducer,
  routing: routerReducer,
});

export default rootReducer;
