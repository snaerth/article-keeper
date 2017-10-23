import React from 'react';
import Helmet from 'react-helmet';
import Profile from '../../components/profile';

const ProfileRoute = () => (
  <div>
    <Helmet title="Profile" />
    <Profile />
  </div>
);

export default ProfileRoute;
