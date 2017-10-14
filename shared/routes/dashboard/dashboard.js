import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import MediumEditor from '../../components/mediumEditor/editor';

const Dashboard = () => (
  <div>
    <Helmet title="Dashboard" />
    <Container className="mt25">
      <MediumEditor />
    </Container>
  </div>
);

export default Dashboard;
