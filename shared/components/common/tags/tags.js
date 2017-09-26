import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classnames from 'classnames';
import s from './tags.scss';

const Tags = ({ roles }) => (
  <div>
    {roles.map((role) => {
      switch (role) {
        case 'admin':
          return (
            <span key={shortid.generate()} className={classnames(s.role, s.admin)}>
              {role}
            </span>
          );
        default:
          return (
            <span key={shortid.generate()} className={s.role}>
              {role}
            </span>
          );
      }
    })}
  </div>
);

Tags.propTypes = {
  roles: PropTypes.array.isRequired,
};

export default Tags;
