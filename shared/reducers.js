import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './components/auth/reducer';
import commonReducer from './common/reducer';

const rootReducer = combineReducers({
  common: commonReducer,
  form,
  auth: authReducer,
});

export default rootReducer;
