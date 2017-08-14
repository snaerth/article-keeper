import React from 'react';
import Helmet from 'react-helmet';

// Components
import Profile from '../../components/profile';

// Containers
import Container from '../../components/container';

const ProfileRoute = () => (
  <Container className="mt25 max-1200">
    <Helmet title="Profile" />
    <h1>Profile</h1>
    <Profile />
  </Container>
);

export default ProfileRoute;
