import React from 'react';
import PropTypes from 'prop-types';
import s from './pagination.scss';

function Pagination({ page, pages, onClick }) {
  const pagesArr = Array.from({ length: pages }, (v, i) => i + 1);

  if (pages <= 1) return null;
  return (
    <div className={s.container}>
      <div className={s.pagination}>
        <a
          role="button"
          tabIndex="0"
          onClick={() => onClick(page <= 1 ? 1 : page - 1)}
        >
          ❮
        </a>
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
            <a
              key={`pagination-page-${i}`}
              role="button"
              tabIndex="0"
              onClick={() => onClick(i)}
            >
              {i}
            </a>
          );
        })}
        <a
          role="button"
          tabIndex="0"
          onClick={() => onClick(page >= pages ? pages : page + 1)}
        >
          ❯
        </a>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
