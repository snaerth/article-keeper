import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import App from './index';

it('renders without crashing', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<App />);
  expect(renderer).not.toBe(undefined);
});
