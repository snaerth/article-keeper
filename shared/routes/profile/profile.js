import React from 'react';
import Helmet from 'react-helmet';

// Components
import Profile from '../../components/profile';

// Containers
import Container from '../../components/common/container';

const ProfileRoute = () => (
  <div>
    <Helmet title="Profile" />
    <div className="banner">
      <Container>
        <h1>Profile</h1>
      </Container>
    </div>
    <Container className="mt25">
      <Profile />
    </Container>
  </div>
);

export default ProfileRoute;
