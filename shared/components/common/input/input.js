import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './input.scss';
import ErrorText from '../errorText';

class Input extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    input: PropTypes.object,
    meta: PropTypes.object,
    autocomplete: PropTypes.string,
    children: PropTypes.element,
    hidelabel: PropTypes.bool,
    required: PropTypes.bool,
  };

  state = {
    active: false,
  };

  onFocusHandler = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  render() {
    const {
      meta,
      id,
      label,
      children,
      input,
      type,
      placeholder,
      autocomplete,
      hidelabel,
      required,
    } = this.props;
    const { active } = this.state;
    const hasError = meta && meta.error && meta.touched;

    return (
      <div>
        <span
          className={classnames(
            s.input,
            id === 'search' ? s.searchInput : '',
            active || input.value ? s.active : '',
            hasError ? s.error : '',
          )}
        >
          <input
            {...input}
            type={type}
            className={s.inputField}
            id={id}
            name={id}
            placeholder={placeholder}
            autoComplete={autocomplete || 'off'}
            required={required ? 'required' : ''}
            onFocus={this.onFocusHandler}
            onBlur={this.onFocusHandler}
          />
          {!hidelabel ? (
            <label className={s.inputLabel} htmlFor={id}>
              <span className={s.inputLabelContent}>{label}</span>
            </label>
          ) : null}
          {children ? (
            <span className={classnames(s.icon, hidelabel ? s.iconNoLable : '')}>{children}</span>
          ) : null}
        </span>
        {hasError ? <ErrorText key={id} id={id} error={meta.error} /> : null}
      </div>
    );
  }
}

export default Input;
