import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => import('./resetPassword'),
  ssrMode: 'boundary',
  name: 'Reset password',
});

// export { default } from './resetPassword';
