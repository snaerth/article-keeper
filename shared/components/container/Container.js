import React from 'react';
import PropTypes from 'prop-types';
import s from './container.scss';

const Container = ({ children }) => (
  <div className={s.container}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
