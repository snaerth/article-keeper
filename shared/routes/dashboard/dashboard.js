import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import MediumEditor from '../../components/mediumEditor/editor';
import Banner from '../../components/common/banner';

const Dashboard = () => (
  <div>
    <Helmet title="Dashboard" />
    <Banner text="Dashboard" />
    <Container className="mt25">
      <MediumEditor />
    </Container>
  </div>
);

export default Dashboard;
