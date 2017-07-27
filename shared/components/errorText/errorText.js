import React from 'react';
import PropTypes from 'prop-types';
import styles from './errorText.scss';

const ErrorText = ({ error, id }) => (
  <div key={id} className={styles.error} role="alert" aria-describedby={id}>
    {error}
  </div>
);

ErrorText.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
};

export default ErrorText;
