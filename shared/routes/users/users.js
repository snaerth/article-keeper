import React from 'react';
import Helmet from 'react-helmet';
// Components
import Users from '../../components/users';
import Container from '../../components/common/container';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <Container className="pt25">
      <Users />
    </Container>
  </div>
);

export default UsersRoute;
