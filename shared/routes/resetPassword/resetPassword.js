import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import ResetPassword from '../../components/auth/resetPassword';

const ResetPasswordRoute = () => (
  <div>
    <Helmet title="Reset password" />
    <Container className="pt25">
      <ResetPassword />
    </Container>
  </div>
);

export default ResetPasswordRoute;
