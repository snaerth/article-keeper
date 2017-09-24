import React from 'react';
import Helmet from 'react-helmet';

// Components
import Users from '../../components/users';

// Containers
import Container from '../../components/common/container';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <div className="banner">
      <Container>
        <h1>Users</h1>
      </Container>
    </div>
    <Container className="mt25mb50">
      <Users />
    </Container>
  </div>
);

export default UsersRoute;
