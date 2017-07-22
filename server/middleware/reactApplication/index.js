import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {
  AsyncComponentProvider,
  createAsyncContext,
} from 'react-async-component';
import { JobProvider, createJobContext } from 'react-jobs';
import asyncBootstrapper from 'react-async-bootstrapper';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import timing from 'utils/timing';
import configureStore from '../../../shared/store/configureStore';
import config from '../../../config';
import App from '../../../shared';
import ServerHTML from './ServerHTML';

/**
 * React application middleware, supports server side rendering.
 */
export default function reactApplicationMiddleware(req, res) {
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the res');
  }
  const nonce = res.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(
      <ServerHTML helmet={Helmet.rewind()} nonce={nonce} />,
    );
    res.status(200).send(`<!DOCTYPE html>${html}`);
    return;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = createAsyncContext();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {};

  // Create the job context for our provider, this grants
  // us the ability to track the resolved jobs to send back to the client.
  const jobContext = createJobContext();

  // Compile an initial state
  const preloadedState = {};

  // Create a new Redux store instance
  const store = configureStore(preloadedState);

  // Declare our React application.
  const app = (
    <AsyncComponentProvider asyncContext={asyncComponentsContext}>
      <JobProvider jobContext={jobContext}>
        <Provider store={store} key="provider">
          <StaticRouter location={req.url} context={reactRouterContext}>
            <App />
          </StaticRouter>
        </Provider>
      </JobProvider>
    </AsyncComponentProvider>
  );

  // Measure the time it takes to complete the async boostrapper runtime.
  const { end: endRuntimeTiming } = timing.start('Server runtime');

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  asyncBootstrapper(app).then(() => {
    const { end: endRenderTiming } = timing.start('Render app');
    const appString = renderToString(app);
    endRenderTiming();

    const html = renderToStaticMarkup(
      <ServerHTML
        reactAppString={appString}
        nonce={nonce}
        helmet={Helmet.rewind()}
        routerState={reactRouterContext}
        jobsState={jobContext.getState()}
        asyncComponentsState={asyncComponentsContext.getState()}
      />,
    );

    // Check if the router context contains a redirect, if so we need to set
    // the specific status and redirect header and end the res.
    if (reactRouterContext.url) {
      res.status(302).setHeader('Location', reactRouterContext.url);
      res.end();
      return;
    }

    // End the measurement
    endRuntimeTiming();

    // Set server timings header for Chrome network tab timings.
    res.set('Server-Timing', timing.toString());

    res.status(reactRouterContext.status || 200).send(`<!DOCTYPE html>${html}`);
  });
}
