import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';

const About = () => (
  <div>
    <Helmet title="About" />
    <div className="banner">
      <Container>
        <h1>About</h1>
      </Container>
    </div>
    <Container className="mt25">
      About text
    </Container>
  </div>
);

export default About;
