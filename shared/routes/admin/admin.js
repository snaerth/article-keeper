import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import Loader from '../../components/common/loader';

const Admin = () => (
  <Container className="mt25">
    <Helmet title="Admin Page" />
    <h1>Admin</h1>
    <Loader>Loading...</Loader>
  </Container>
);

export default Admin;
