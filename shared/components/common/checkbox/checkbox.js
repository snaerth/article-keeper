import React from 'react';
import PropTypes from 'prop-types';
import s from './checkbox.scss';
import ErrorText from '../errorText';

const Input = ({ meta, id, label, input, required }) => (
  <div className={s.checkbox}>
    <input {...input} type="checkbox" id={id} name={id} required={required ? 'required' : ''} />
    <label htmlFor={id}>{label}</label>
    {meta && meta.error && meta.touched ? <ErrorText key={id} id={id} error={meta.error} /> : null}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object,
  meta: PropTypes.object,
  required: PropTypes.bool,
};

export default Input;
