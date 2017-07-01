import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import styles from './input.scss';
import ErrorText from '../errorText';

const Input = props => (
  <div>
    <CSSTransitionGroup
      component="div"
      transitionName="fadeIn"
      transitionEnterTimeout={700}
      transitionLeaveTimeout={350}
    >
      {props.meta.error && props.meta.touched
        ? <ErrorText key={props.id} id={props.id} error={props.meta.error} />
        : null}
    </CSSTransitionGroup>
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
