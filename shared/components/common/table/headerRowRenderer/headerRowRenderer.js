import React from 'react';
import PropTypes from 'prop-types';

function defaultHeaderRowRenderer({ className, columns, style }) {
  console.log(className, columns, style);
  return (
    <div className={className} role="row" style={style}>
      {columns}
    </div>
  );
}

defaultHeaderRowRenderer.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

export default defaultHeaderRowRenderer;
