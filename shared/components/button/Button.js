import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './button.scss';

/**
 * Button component
 */
const Button = (props) => {
  const { text, ariaLabel, color, className, onClick, type } = props;
  return (
    <button
      className={classnames(
        styles.button,
        styles[color || 'default'],
        styles[className],
      )}
      type={type || 'submit'}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {text}
      <span className={styles.icon}>{props.children}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
