import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../common/transitions';
import styles from './spinner.scss';

/**
 * Spinner component
 */
const Spinner = props => (
  <TransitionGroup>
    <Transition
      classNames="fadeIn"
      timeout={{ enter: 700, exit: 350 }}
      key="spinner"
    >
      <div className={styles.spinner}>
        <svg className={styles.ball}>
          <circle cx="10" cy="10" r="10" />
        </svg>
        <p className={styles.text}>{props.children}</p>
      </div>
    </Transition>
  </TransitionGroup>
);

Spinner.propTypes = {
  children: PropTypes.string,
};

export default Spinner;
