import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './MainHeading.scss';

/**
 * Main heading component
 */
const MainHeading = ({ text, className }) => (
  <h1 className={classnames(styles.heading, styles[className])}>{text}</h1>
);

MainHeading.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MainHeading;
