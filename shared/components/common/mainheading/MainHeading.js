import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './MainHeading.scss';

/**
 * Main heading component
 */
const MainHeading = ({ children, className }) => (
  <h1 className={classnames(styles.heading, styles[className])}>{children}</h1>
);

MainHeading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MainHeading;
