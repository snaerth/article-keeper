import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './buttonLink.scss';

/**
 * ButtonLink component
 */
const ButtonLink = (props) => {
  const {
    href, text, title, color, className = '', onClick,
  } = props;
  const classNamesArr = className.split(' ');
  const cNames = classNamesArr.map((cName) => s[cName]).join(' ');

  return (
    <a
      className={classnames(s.button, s[color], cNames)}
      href={href}
      title={title}
      onClick={onClick}
    >
      <span className={s.icon}>{props.children}</span>
      {text}
    </a>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default ButtonLink;
