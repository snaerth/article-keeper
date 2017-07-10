import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './container.scss';

const Container = ({ children, className }) => (
  <div className={classnames(s.container, className ? s[className] : '')}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node
};

export default Container;
