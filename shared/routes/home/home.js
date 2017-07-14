import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/container';
import MediumEditor from '../../components/mediumEditor/editor';

const Home = () => (
  <Container className="mt25">
    <Helmet title="Home" />
    Home
    <MediumEditor />
  </Container>
);

export default Home;
