import React from 'react';
import Helmet from 'react-helmet';

// Components
import Logger from '../../components/logger';

// Containers
import Container from '../../components/common/container';

const LoggerRoute = () => (
  <div>
    <Helmet title="Logger" />
    <div className="banner">
      <Container>
        <h1>Admin system logs</h1>
      </Container>
    </div>
    <Container className="mt25mb50">
      <Logger />
    </Container>
  </div>
);

export default LoggerRoute;
