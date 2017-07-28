import React from 'react';
import PropTypes from 'prop-types';
import s from './loader.scss';

/**
 * Loader component
 */
const Loader = props => (
  <div className={s.container}>
    <div className={s.loader}>
      <div className={s.logo}>
        <div className={s.medium} />
        <div className={s.big} />
      </div>
      <p>{props.children}</p>
    </div>
  </div>
);

Loader.propTypes = {
  children: PropTypes.string,
};

export default Loader;
