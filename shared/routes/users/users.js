import React from 'react';
import Helmet from 'react-helmet';
// Components
import Users from '../../components/users';
import Container from '../../components/common/container';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <Container>
      <Users />
    </Container>
  </div>
);

export default UsersRoute;
