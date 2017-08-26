import React from 'react';
import Helmet from 'react-helmet';

// Components
import Signin from '../../components/auth/signin';
// Containers
import Container from '../../components/container';
// Styles
import s from './signin.scss';

const SigninRoute = () => (
  <Container className="mt25">
    <Helmet title="Signin" />
    <h1>Signin</h1>
    <div className={s.container}>
      <div className={s.containerOuter}>
        <Signin className={s.containerAuth} />
      </div>
    </div>
  </Container>
);

export default SigninRoute;
