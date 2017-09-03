import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import MediumEditor from '../../components/mediumEditor/editor';

const Home = () => (
  <div>
    <Helmet title="Home" />
    <div className="banner">
      <Container>
        <h1>Home</h1>
      </Container>
    </div>
    <Container className="mt25">
      <MediumEditor />
    </Container>
  </div>
);

export default Home;
