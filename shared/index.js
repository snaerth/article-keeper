import React from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import config from 'utils/config';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Analytics from 'components/analytics';

// Routes
import Home from './routes/home';
import About from './routes/about';
import NotFound from './routes/not-found';

export default function App() {
  return (
    <AppLayout>
      <Helmet {...config('helmet')} />
      <Content>
        <Route component={Analytics} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </AppLayout>
  );
}
