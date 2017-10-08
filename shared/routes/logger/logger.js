import React from 'react';
import Helmet from 'react-helmet';
import Banner from '../../components/common/banner';
import Logger from '../../components/logger';
import Container from '../../components/common/container';

const LoggerRoute = () => (
  <div>
    <Helmet title="Logger" />
    <Banner text="Logs" />
    <Container className="mt25mb50">
      <Logger />
    </Container>
  </div>
);

export default LoggerRoute;
