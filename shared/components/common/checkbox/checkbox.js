import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './checkbox.scss';
import ErrorText from '../errorText';

const Input = ({ meta, id, label, input, required }) => (
  <div className={classnames(s.button, s.tuli)}>
    <input {...input} type="checkbox" id={id} name={id} required={required ? 'required' : ''} />
    <label htmlFor={id}>{label}</label>
    <div className={s.icon} />
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
