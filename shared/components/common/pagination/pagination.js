import React from 'react';
import PropTypes from 'prop-types';
import s from './pagination.scss';

function Pagination({ page, pages, limit, total }) {
  const pagesArr = Array.from({ length: pages }, (v, i) => i);

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        <a role="button" tabIndex="0">❮</a>
        {pagesArr.map((i) => {
          if (i === page) {
            return (
              <a
                key={`pagination-page-${i}`}
                role="button"
                tabIndex="0"
                className={s.active}
              >
                {i}
              </a>
            );
          }
          return (
            <a key={`pagination-page-${i}`} role="button" tabIndex="0">{i}</a>
          );
        })}
        <a role="button" tabIndex="0">❯</a>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
