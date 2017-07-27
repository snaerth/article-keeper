import React from 'react';
import PropTypes from 'prop-types';
import styles from '../input/input.scss';
import ErrorText from '../errorText';

const Input = props => (
  <span className={styles.input}>
    {props.meta.error && props.meta.touched
      ? <ErrorText key={props.id} id={props.id} error={props.meta.error} />
      : null}
    <textarea
      {...props.input}
      className={styles.inputField}
      id={props.id}
      placeholder={props.placeholder}
    />
    <label className={styles.inputLabel} htmlFor={props.id}>
      <span className={styles.inputLabelContent}>{props.label}</span>
    </label>
  </span>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object,
  error: PropTypes.string,
  touched: PropTypes.bool,
  meta: PropTypes.object,
};

export default Input;
