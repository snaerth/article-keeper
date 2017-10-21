import React from 'react';
import PropTypes from 'prop-types';
import s from './content.scss';

export default function Content({ children }) {
  return <div className={s.content}>{children}</div>;
}

Content.propTypes = {
  children: PropTypes.node,
};
