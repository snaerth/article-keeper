import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import styles from './spinner.scss';

/**
 * Signup component
 */
const Spinner = props => (
  <CSSTransitionGroup
    component="div"
    transitionName="fadeInScale"
    transitionEnterTimeout={700}
    transitionLeaveTimeout={350}
  >
    <div className={styles.spinner}>
      <svg className={styles.ball}>
        <circle cx="10" cy="10" r="10" />
      </svg>
      <p className={styles.text}>{props.children}</p>
    </div>
  </CSSTransitionGroup>
);

Spinner.propTypes = {
  children: PropTypes.string,
};

export default Spinner;
