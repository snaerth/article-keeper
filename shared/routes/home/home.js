import React from 'react';
import Helmet from 'react-helmet';
import Container from '../../components/common/container';
import MediumEditor from '../../components/mediumEditor/editor';
import Banner from '../../components/common/banner';

const Home = () => (
  <div>
    <Helmet title="Home" />
    <Banner text="Home" />
    <Container className="mt25">
      <MediumEditor />
    </Container>
  </div>
);

export default Home;
