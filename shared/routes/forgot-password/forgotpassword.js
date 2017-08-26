import React from 'react';
import Helmet from 'react-helmet';

// Components
import ForgotPassword from '../../components/auth/forgotpassword';
// Containers
import Container from '../../components/container';
// Styles
import s from './forgotpassword.scss';

const ForgotPasswordRoute = () => (
  <Container className="mt25">
    <Helmet title="Forgot password" />
    <h1>Forgot password</h1>
    <div className={s.container}>
      <div className={s.containerOuter}>
        <ForgotPassword className={s.containerAuth} />
      </div>
    </div>
  </Container>
);

export default ForgotPasswordRoute;
