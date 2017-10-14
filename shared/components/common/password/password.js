import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorText from '../errorText';
// Svg
import VisibilitySvg from '../../../assets/images/visibility.svg';
import VisibilityOffSvg from '../../../assets/images/visibility_off.svg';
// Styles
import s from '../input/input.scss';

class Password extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    autoComplete: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      passwordVisibility: false,
      type: 'password',
      active: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onFocusHandler() {
    this.setState({
      active: !this.state.active,
    });
  }

  /**
     * Toggles passwordVisibility state and input type
     */
  toggleVisibility = () => {
    let { type } = this.state;
    const { passwordVisibility } = this.state;
    type = passwordVisibility ? 'password' : 'text';

    this.setState({
      passwordVisibility: !passwordVisibility,
      type,
    });
  };

  render() {
    const { passwordVisibility, type, active } = this.state;
    const { id, meta, input, placeholder, autoComplete, label } = this.props;

    return (
      <div>
        <span
          className={classnames(
            s.input,
            active || input.value ? s.active : '',
            meta && meta.error && meta.touched ? s.error : '',
          )}
        >
          <input
            {...input}
            type={type}
            className={s.inputField}
            id={id}
            name={id}
            placeholder={placeholder}
            autoComplete={autoComplete}
            tabIndex={0}
            onFocus={this.onFocusHandler}
            onBlur={this.onFocusHandler}
          />
          <label className={s.inputLabel} htmlFor={id}>
            <span className={s.inputLabelContent}>{label}</span>
          </label>
          <span className={s.icon} onClick={this.toggleVisibility} role="button" tabIndex={0}>
            {!passwordVisibility ? <VisibilitySvg /> : <VisibilityOffSvg />}
          </span>
        </span>
        {meta.error && meta.touched ? <ErrorText key={id} id={id} error={meta.error} /> : null}
      </div>
    );
  }
}
export default Password;
