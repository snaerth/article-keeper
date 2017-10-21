import React from 'react';
import Helmet from 'react-helmet';
import Profile from '../../components/profile';
import Container from '../../components/common/container';

const ProfileRoute = () => (
  <div>
    <Helmet title="Profile" />
    <Container>
      <Profile />
    </Container>
  </div>
);

export default ProfileRoute;
