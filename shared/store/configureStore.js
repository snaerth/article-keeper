import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxThunk, routerMiddleware(history)),
      typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f,
    ),
  );

  return store;
}
