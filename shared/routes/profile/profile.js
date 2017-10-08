import React from 'react';
import Helmet from 'react-helmet';
import Profile from '../../components/profile';
import Container from '../../components/common/container';
import Banner from '../../components/common/banner';

const ProfileRoute = () => (
  <div>
    <Helmet title="Profile" />
    <Banner text="Profile" />
    <Container className="mt25">
      <Profile />
    </Container>
  </div>
);

export default ProfileRoute;
