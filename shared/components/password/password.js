import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './password.scss';
import ErrorText from '../errorText';
import VisibilitySvg from '../../assets/images/visibility.svg';
import VisibilityOffSvg from '../../assets/images/visibility_off.svg';

class Password extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    autocomplete: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { passwordVisibility: false, type: 'password' };
    this.toggleVisibility = this.toggleVisibility.bind(this);
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
    const { passwordVisibility, type } = this.state;
    const { id, meta, input, placeholder, autocomplete, label } = this.props;

    return (
      <div>
        {meta.error && meta.touched
          ? <ErrorText key={id} id={id} error={meta.error} />
          : null}
        <span className={styles.input}>
          <input
            {...input}
            type={type}
            className={styles.inputField}
            id={id}
            name={id}
            placeholder={placeholder}
            autoComplete={autocomplete || 'off'}
            tabIndex={0}
          />
          <span
            className={styles.icon}
            onClick={this.toggleVisibility}
            role="button"
            tabIndex={0}
          >
            {!passwordVisibility ? <VisibilitySvg /> : <VisibilityOffSvg />}
          </span>
          <label className={styles.inputLabel} htmlFor={id}>
            <span className={styles.inputLabelContent}>{label}</span>
          </label>
        </span>
      </div>
    );
  }
}
export default Password;
