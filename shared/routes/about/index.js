import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => import('./about'),
  ssrMode: 'boundary',
  name: 'About',
});

// export { default } from './about';
