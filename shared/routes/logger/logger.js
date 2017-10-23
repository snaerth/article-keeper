import React from 'react';
import Helmet from 'react-helmet';
import Logger from '../../components/logger';

const LoggerRoute = () => (
  <div>
    <Helmet title="Logger" />
    <Logger />
  </div>
);

export default LoggerRoute;
