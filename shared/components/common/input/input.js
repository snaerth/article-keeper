import React from 'react';
import PropTypes from 'prop-types';
import s from './input.scss';
import ErrorText from '../errorText';

const Input = ({
  meta,
  id,
  label,
  children,
  input,
  type,
  placeholder,
  autocomplete,
  hidelabel,
}) => (
  <div>
    <span className={s.input}>
      {!hidelabel
        ? <label className={s.inputLabel} htmlFor={id}>
          <span className={s.inputLabelContent}>{label}</span>
        </label>
        : null}
      <input
        {...input}
        type={type}
        className={s.inputField}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete={autocomplete || 'off'}
      />
      {children ? <span className={s.icon}>{children}</span> : null}
    </span>
    {meta && meta.error && meta.touched
      ? <ErrorText key={id} id={id} error={meta.error} />
      : null}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  input: PropTypes.object,
  meta: PropTypes.object,
  autocomplete: PropTypes.string,
  children: PropTypes.element,
  hidelabel: PropTypes.bool,
};

export default Input;
