import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Svg
import DoneIcon from '../../../assets/images/done.svg';
import ErrorIcon from '../../../assets/images/error.svg';
import WarningIcon from '../../../assets/images/warning.svg';
// s
import s from './notifyBox.scss';

/**
 * Error component
 */
class Error extends Component {
  static propTypes = {
    strongText: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
  };

  checkBoxType(type) {
    switch (type) {
      case 'error':
        return s.error;

      case 'success':
        return s.success;

      case 'info':
        return s.info;

      case 'warning':
        return s.warning;

      default:
        return s.error;
    }
  }

  componentDidMount() {
    this.scrollToComponent();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.text) {
      this.scrollToComponent();
    }
  }

  setIcon(type) {
    switch (type) {
      case 'success':
        return <DoneIcon className={s.icon} />;

      case 'error':
        return <ErrorIcon className={s.icon} />;

      case 'info':
        return <ErrorIcon className={s.icon} />;

      case 'warning':
        return <WarningIcon className={s.icon} />;

      default:
        return '';
    }
  }

  /**
   * Scrolls to this component
   */
  scrollToComponent() {
    this.container.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {
      text, strongText, type, className, id,
    } = this.props;

    return (
      <div
        id={id}
        className={classnames(s.box, this.checkBoxType(type), className)}
        ref={(c) => (this.container = c)}
      >
        {this.setIcon(type)}
        {strongText ? <strong>{strongText}</strong> : null}
        {text}
      </div>
    );
  }
}

export default Error;
