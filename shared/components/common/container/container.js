import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './container.scss';

const Container = ({ children, className }) => {
  if (className) {
    const classNamesArr = className.split(' ');
    const cNames = classNamesArr.map((cName) => s[cName]).join(' ');

    return (
      <div className={classnames(s.container, cNames)}>
        {children}
      </div>
    );
  }

  return (
    <div className={s.container}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
