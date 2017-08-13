import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import('./logger'),
  ssrMode: 'boundary',
  name: 'Log',
});

// export { default } from './logger';
