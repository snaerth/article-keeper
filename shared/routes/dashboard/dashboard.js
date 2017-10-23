import React from 'react';
import Helmet from 'react-helmet';
import MediumEditor from '../../components/mediumEditor/editor';

const Dashboard = () => (
  <div>
    <Helmet title="Dashboard" />
    <MediumEditor />
  </div>
);

export default Dashboard;
