import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TweenMax } from 'gsap';
import styles from './notifyBox.scss';

/**
 * Error component
 */
class Error extends Component {
  static propTypes = {
    strongText: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  componentDidMount() {
    TweenMax.fromTo(this.container, 0.5, { y: 10 }, { y: 0 });
  }

  checkBoxType(type) {
    switch (type) {
      case 'error':
        return styles.error;

      case 'success':
        return styles.success;

      default:
        return styles.error;
    }
  }

  render() {
    const { text, strongText, type, className } = this.props;

    return (
      <div
        className={classnames(styles.box, this.checkBoxType(type), className)}
        ref={c => this.container = c}
      >
        {strongText ? <strong>{strongText}</strong> : null}
        {text}
      </div>
    );
  }
}

export default Error;
