import React from 'react';
import PropTypes from 'prop-types';
import TextAnime from '../textAnime';
import Container from '../container';
import s from './banner.scss';

function Banner({ text }) {
  return (
    <div className="banner">
      <Container>
        <TextAnime text={text} />
      </Container>
    </div>
  );
}

Banner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Banner;
