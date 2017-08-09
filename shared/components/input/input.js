import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.scss';
import ErrorText from '../errorText';

const Input = (props) => (
  <div>
    {props.meta.error && props.meta.touched
      ? <ErrorText key={props.id} id={props.id} error={props.meta.error} />
      : null}
    <span className={styles.input}>
      {props.children
        ? <span className={styles.icon}>{props.children}</span>
        : null}
      <input
        {...props.input}
        type={props.type}
        className={styles.inputField}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        autoComplete={props.autocomplete || 'off'}
      />
      <label className={styles.inputLabel} htmlFor={props.id}>
        <span className={styles.inputLabelContent}>{props.label}</span>
      </label>
    </span>
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  input: PropTypes.object,
  error: PropTypes.string,
  touched: PropTypes.bool,
  meta: PropTypes.object,
  autocomplete: PropTypes.string,
  children: PropTypes.element,
};

export default Input;
