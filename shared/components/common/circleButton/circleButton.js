import React from 'react';
import PropTypes from 'prop-types';
import s from './circleButton.scss';

const CircleButton = ({ children, onClick }) => (
  <button className={s.circle} onClick={(e) => onClick(e)}>
    {children}
  </button>
);

CircleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CircleButton;
