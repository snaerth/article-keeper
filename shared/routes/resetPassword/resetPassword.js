import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import ResetPassword from '../../components/auth/resetPassword';

const ResetPasswordRoute = () => (
  <div>
    <Helmet title="Reset password" />
    <div className="banner">
      <Container>
        <h1>Reset password</h1>
      </Container>
    </div>
    <Container className="mt25">
      <ResetPassword />
    </Container>
  </div>
);

export default ResetPasswordRoute;
