import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import splitToChunks from '../../../utils/arrayHelpers';
import s from './pagination.scss';

/**
 * Pagination component
 * Usage <Pagination
 *          page={11}  // Current active page
 *          pages={24} // Total pages
 *          onClick={onPageClickHandler} // Handler function when page is clicked
 *          set={2} // Active set, each set is 10 numbers.
 *                  // Best practice is to use Math.floor(currentActivePage / 10)
 *         />
 */
class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    set: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSet: props.set,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState(() => ({ activeSet: Math.floor(nextProps.page / 10) }));
    }
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

  clickHandler(activeSet, chunksArr, direction) {
    let active;

    switch (direction) {
      case 'next':
        active = activeSet + 1;
        break;
      case 'prev':
        active = activeSet - 1;
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

    this.setState(() => ({ activeSet: active }));
  }

  render() {
    const { page, pages, onClick } = this.props;
    const { activeSet } = this.state;
    const pagesArr = this.createArr(pages);
    const chunksArr = splitToChunks(pagesArr, 10);

    if (pages <= 1) {
      return null;
    }

    return (
      <div className={s.container}>
        <div className={s.pagination}>
          <a
            role="button"
            tabIndex="0"
            onClick={() => this.clickHandler(activeSet, chunksArr, 'prev')}
          >
            ❮
          </a>
          <div className={s.numberContainer}>
            {chunksArr.map((arr, i) => (
              <div
                key={shortid.generate()}
                className={activeSet === i ? s.active : ''}
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
              </div>
            ))}
          </div>
          <a
            role="button"
            tabIndex="0"
            onClick={() => this.clickHandler(activeSet, chunksArr, 'next')}
          >
            ❯
          </a>
        </div>
      </div>
    );
  }
}

export default Pagination;
