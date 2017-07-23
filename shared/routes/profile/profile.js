import React from 'react';
import Helmet from 'react-helmet';

// Components
import Profile from '../../components/profile';

// Containers
import Container from '../../components/container';

const ProfileRoute = () => (
  <Container className="mt25">
    <Helmet title="Profile" />
    <Profile />
  </Container>
);

export default ProfileRoute;
