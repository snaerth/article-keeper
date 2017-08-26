import React from 'react';
import PropTypes from 'prop-types';
import s from './loader.scss';

/**
 * Loader component
 */
const Loader = ({ children, absolute }) => (
  <div className={absolute ? s.absolute : ''}>
    <div className={s.container}>
      <div className={s.loader}>
        <i className={s.layer} />
        <i className={s.layer} />
        <i className={s.layer} />
      </div>
      <p>{children}</p>
    </div>
  </div>
);

Loader.propTypes = {
  children: PropTypes.string,
  absolute: PropTypes.bool,
};

export default Loader;
