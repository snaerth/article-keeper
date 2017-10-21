import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import Banner from '../../components/common/banner';

const About = () => (
  <div>
    <Helmet title="About" />
    <Banner text="About" />
    <Container className="pt25">
      About text
    </Container>
  </div>
);

export default About;
