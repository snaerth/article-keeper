import React from 'react';
import PropTypes from 'prop-types';
import s from './loader.scss';

/**
 * Loader component
 */
const Loader = (props) => (
  <div className={s.container}>
    <div className={s.loader}>
      <i className={s.layer} />
      <i className={s.layer} />
      <i className={s.layer} />
    </div>
    <p>{props.children}</p>
  </div>
);

Loader.propTypes = {
  children: PropTypes.string,
};

export default Loader;
