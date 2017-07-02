// React server rendering
import React from 'react';
import { StaticRouter as Router, matchPath } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import renderHtml from '../utils/renderHtml';
import NotFound from '../../client/routes/notfound';
import App from '../../client/components';
import configureStore from '../../client/store/configureStore';

let assets = require('../../../assets.json'); // eslint-disable-line
const routes = [
  '/',
  '/signin',
  '/signup',
  '/signout',
  '/forgotpassword',
  '/reset/:token',
  '/profile',
  '/admin',
];
/**
 * Handles all request and renders react universally
 * @param {Object} req - Request object
 * @param {Object} res - Reponse object
 * @returns {undefined}
 */
export default function handleRender(req, res) {
  res.set('content-type', 'text/html');

  const match = routes.reduce(
    (acc, route) => matchPath(req.url, route, { exact: true }) || acc,
    null,
  );

  if (!match) {
    res.status(404).send(renderHtml(<NotFound />));
    return;
  }

  // Compile an initial state
  const preloadedState = {};
  // Create a new Redux store instance
  const store = configureStore(preloadedState);
  // Render the component to a string
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router context={{}} location={req.url}>
        <App />
      </Router>
    </Provider>,
  );

  // Grab the initial state from Redux store
  const finalState = store.getState();

  const renderHtmlObj = {
    html,
    finalState,
    assets,
  };

  res.status(200);
  // Send the rendered page to the client
  res.send(renderHtml(renderHtmlObj));
  res.end();
}
