import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import AppLayout, { Content } from 'components/app-layout';
import Analytics from 'components/analytics';
import config from './utils/config';

// Routes
import routes from './routes';

// Container Components
import RoutesContainer from './containers/routesContainer';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />
      <Content>
        <Route component={Analytics} />
        <RoutesContainer>{routes}</RoutesContainer>
      </Content>
    </AppLayout>
  );
}
