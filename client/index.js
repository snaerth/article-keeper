/* eslint-disable global-require */
/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';
import asyncBootstrapper from 'react-async-bootstrapper';
import { AsyncComponentProvider } from 'react-async-component';
import { JobProvider } from 'react-jobs';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import config from 'utils/config';
import configureStore from '../shared/store/configureStore';
import ReactHotLoader from './components/ReactHotLoader';
import rootReducer from '../shared/reducers';
import App from '../shared';

// Initialize Google Analytics
const gaId = config('gaId');
if (gaId) {
  ReactGA.initialize(gaId);
}

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Compile an initial state
const preloadedState = {};

// Create an enhanced history that syncs navigation events with the store
const store = configureStore(preloadedState);
window.store = store;

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
const asyncComponentsRehydrateState =
  window.__ASYNC_COMPONENTS_REHYDRATE_STATE__; // eslint-disable-line no-underscore-dangle

// Get any "rehydrate" state sent back by the server
// eslint-disable-next-line no-underscore-dangle
const rehydrateState = window.__JOBS_STATE__;

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <JobProvider rehydrateState={rehydrateState}>
          <Provider store={store} key="provider">
            <BrowserRouter forceRefresh={!supportsHistory}>
              <TheApp />
            </BrowserRouter>
          </Provider>
        </JobProvider>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  asyncBootstrapper(app).then(() => render(app, container));
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  module.hot.accept('../shared/reducers', () => {
    // redux store has a method replaceReducer
    store.replaceReducer(rootReducer);
  });

  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(() => renderApp(require('../shared').default));

  const consoleWarn = console.warn;

  console.warn = (first, ...args) => {
    const noStoreChange = /Provided store (.*) has changed/;
    if (first && noStoreChange.test(first)) return;
    consoleWarn.call(console, first, ...args);
  };
}
