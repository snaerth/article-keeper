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
    {meta && meta.error && meta.touched
      ? <ErrorText key={id} id={id} error={meta.error} />
      : null}
    <span className={s.input}>
      {children ? <span className={s.icon}>{children}</span> : null}
      <input
        {...input}
        type={type}
        className={s.inputField}
        id={id}
        name={id}
        placeholder={placeholder}
        autoComplete={autocomplete || 'off'}
      />
      {!hidelabel
        ? <label className={s.inputLabel} htmlFor={id}>
          <span className={s.inputLabelContent}>{label}</span>
        </label>
        : null}
    </span>
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
