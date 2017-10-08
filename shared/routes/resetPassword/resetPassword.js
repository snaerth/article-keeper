import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import ResetPassword from '../../components/auth/resetPassword';
import Banner from '../../components/common/banner';

const ResetPasswordRoute = () => (
  <div>
    <Helmet title="Reset password" />
    <Banner text="Reset password" />
    <Container className="mt25">
      <ResetPassword />
    </Container>
  </div>
);

export default ResetPasswordRoute;
