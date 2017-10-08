import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import Banner from '../../components/common/banner';

const Admin = () => (
  <div>
    <Helmet title="Admin" />
    <Banner text="Admin" />
    <Container className="mt25">
      Bla
    </Container>
  </div>
);

export default Admin;
