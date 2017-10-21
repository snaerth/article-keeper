import React from 'react';
import Helmet from 'react-helmet';
import Logger from '../../components/logger';
import Container from '../../components/common/container';

const LoggerRoute = () => (
  <div>
    <Helmet title="Logger" />
    <Container>
      <Logger />
    </Container>
  </div>
);

export default LoggerRoute;
