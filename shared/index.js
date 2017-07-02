import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Analytics from 'components/analytics';

// Routes
import routes from './routes';

// Components
import Header from './components/header';

// Container Components
import RoutesContainer from './containers/routesContainer';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />
      <Header />
      <Content>
        <Route component={Analytics} />
        <RoutesContainer>{routes}</RoutesContainer>
      </Content>
    </AppLayout>
  );
}
