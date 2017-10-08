import React from 'react';
import Helmet from 'react-helmet';
// Components
import Users from '../../components/users';
import Container from '../../components/common/container';
import Banner from '../../components/common/banner';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <Banner text="Users" />
    <Container className="mt25mb50">
      <Users />
    </Container>
  </div>
);

export default UsersRoute;
