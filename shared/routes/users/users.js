import React from 'react';
import Helmet from 'react-helmet';

// Components
import Users from '../../components/users';
import TextAnime from '../../components/common/textAnime';

// Containers
import Container from '../../components/common/container';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <div className="banner">
      <Container>
        <TextAnime text="Users" />
      </Container>
    </div>
    <Container className="mt25mb50">
      <Users />
    </Container>
  </div>
);

export default UsersRoute;
