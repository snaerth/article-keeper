import React from 'react';
import PropTypes from 'prop-types';
import s from './circleButton.scss';

const CircleButton = ({ children }) => <button className={s.circle}>{children}</button>;

CircleButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CircleButton;
