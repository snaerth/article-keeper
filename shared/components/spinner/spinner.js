import React from 'react';
import PropTypes from 'prop-types';
import styles from './spinner.scss';

/**
 * Spinner component
 */
const Spinner = props => (
  <div className={styles.spinner}>
    <svg className={styles.ball}>
      <circle cx="10" cy="10" r="10" />
    </svg>
    <p className={styles.text}>{props.children}</p>
  </div>
);

Spinner.propTypes = {
  children: PropTypes.string,
};

export default Spinner;
