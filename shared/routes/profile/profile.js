import React from 'react';
import Helmet from 'react-helmet';

// Components
import Profile from '../../components/profile';

// Containers
import Container from '../../components/common/container';

const ProfileRoute = () => (
  <Container className="mt25">
    <Helmet title="Profile" />
    <h1>Profile</h1>
    <Profile />
  </Container>
);

export default ProfileRoute;
