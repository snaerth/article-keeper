import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import('./editor'),
  ssrMode: 'boundary',
  name: 'Editor',
});

// export { default } from './editor';
