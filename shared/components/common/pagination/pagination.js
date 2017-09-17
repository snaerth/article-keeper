import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import splitToChunks from '../../../utils/arrayHelpers';
import s from './pagination.scss';

/**
 * Pagination function component
 *
 * @param {Object} page | pages | onClick
 */

class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeArr: Math.floor(props.page / 10),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState(() => ({ activeArr: Math.floor(nextProps.page / 10) }));
    }
  }

  /**
   * Sets active chunk
   *
   * @param {Array} chunksArr - Array of arrays
   * @param {Number} activePage
   */
  activeChunk(chunksArr, activePage) {
    let active = 0;
    for (let i = 0; i < chunksArr.length; i++) {
      if (chunksArr[i].includes(activePage)) {
        active = i;
      }
    }

    return active;
  }

  /**
   * Creates array from pages length. For example 6 = [1,2,3,4,5,6]
   * Starting index is one
   *
   * @param {Number} len
   * @returns {Array}
   */
  createArr(len) {
    return Array.from({ length: len }, (v, i) => i + 1);
  }

  clickHandler(activeArr, chunksArr, direction) {
    let active;

    switch (direction) {
      case 'next':
        active = activeArr + 1;
        break;
      case 'prev':
        active = activeArr - 1;
        break;
      default:
        active = 0;
        break;
    }

    const len = chunksArr.length - 1;

    if (active >= len) {
      active = len;
    } else if (active <= 0) {
      active = 0;
    }

    this.setState(() => ({ activeArr: active }));
  }

  render() {
    const { page, pages, onClick } = this.props;
    const { activeArr } = this.state;
    const pagesArr = this.createArr(pages);
    const chunksArr = splitToChunks(pagesArr, 10);
    const nextActiveArr = this.activeChunk(chunksArr, page);
    console.log(activeArr);
    if (pages <= 1) {
      return null;
    }

    return (
      <div className={s.container}>
        <div className={s.pagination}>
          <a
            role="button"
            tabIndex="0"
            onClick={() => this.clickHandler(activeArr, chunksArr, 'prev')}
          >
            ❮
          </a>
          <span className={s.numberContainer}>
            {chunksArr.map((arr, i) => (
              <span
                key={shortid.generate()}
                className={activeArr === i ? s.active : ''}
              >
                {arr.map((j) => {
                  if (j === page) {
                    return (
                      <a
                        key={shortid.generate()}
                        role="button"
                        tabIndex="0"
                        className={s.active}
                      >
                        {j}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={shortid.generate()}
                      role="button"
                      tabIndex="0"
                      onClick={() => onClick(j)}
                    >
                      {j}
                    </a>
                  );
                })}
              </span>
            ))}
          </span>
          <a
            role="button"
            tabIndex="0"
            onClick={() => this.clickHandler(activeArr, chunksArr, 'next')}
          >
            ❯
          </a>
        </div>
      </div>
    );
  }
}

export default Pagination;
/* onClick(page >= pages ? pages : page + 1) */
