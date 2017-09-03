import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import Loader from '../../components/common/loader';

const Admin = () => (
  <div>
    <Helmet title="Admin" />
    <div className="banner">
      <Container>
        <h1>Admin</h1>
      </Container>
    </div>
    <Container className="mt25">
      Bla
    </Container>
  </div>
);

export default Admin;
