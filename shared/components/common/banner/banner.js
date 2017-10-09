import React from 'react';
import PropTypes from 'prop-types';
import Container from '../container';
import Fade from '../animations/fade';
import s from './banner.scss';

function Banner({ text }) {
  return (
    <div className={s.container}>
      <Container>
        <Fade in>
          <h1>{text}</h1>
        </Fade>
      </Container>
    </div>
  );
}

Banner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Banner;
