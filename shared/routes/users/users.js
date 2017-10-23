import React from 'react';
import Helmet from 'react-helmet';
// Components
import Users from '../../components/users';

const UsersRoute = () => (
  <div>
    <Helmet title="Users" />
    <Users />
  </div>
);

export default UsersRoute;
