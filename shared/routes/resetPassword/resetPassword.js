import React from 'react';
import Helmet from 'react-helmet';
import ResetPassword from '../../components/auth/resetPassword';

const ResetPasswordRoute = () => (
  <div>
    <Helmet title="Reset password" />
    <ResetPassword />
  </div>
);

export default ResetPasswordRoute;
