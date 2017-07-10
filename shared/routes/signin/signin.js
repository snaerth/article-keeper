import React from 'react';
import Helmet from 'react-helmet';

// Components
import Signin from '../../components/auth/signin';

// Containers
import Container from '../../components/container';

const SigninRoute = () => (
  <Container className="mt25">
    <Helmet title="Signin" />
    <Signin />
  </Container>
);

export default SigninRoute;
