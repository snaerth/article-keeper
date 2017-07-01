import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import styles from './errorText.scss';

const ErrorText = ({ error, id }) => (
  <CSSTransitionGroup
    transitionName="fadeIn"
    transitionEnterTimeout={700}
    transitionLeaveTimeout={700}
  >
    <div key={id} className={styles.error} role="alert" aria-describedby={id}>
      {error}
    </div>
  </CSSTransitionGroup>
);

ErrorText.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
};

export default ErrorText;
