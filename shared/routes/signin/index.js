import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import('./signin'),
  ssrMode: 'boundary',
  name: 'Signin',
});

// export { default } from './signin';
