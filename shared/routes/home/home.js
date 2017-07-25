import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/container';
import MediumEditor from '../../components/mediumEditor/editor';
import Loader from '../../components/loader';

const Home = () => (
  <Container className="mt25">
    <Helmet title="Home" />
    Home
    <Loader>Loading</Loader>
    <MediumEditor />
  </Container>
);

export default Home;
