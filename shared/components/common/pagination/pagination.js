import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

class Pagination extends Component {
  static propTypes = {
    initialPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageChangeHandler: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.initialPage && nextProps.initialPage !== this.props.initialPage
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { initialPage, pageCount, onPageChangeHandler } = this.props;

    if (pageCount <= 1) {
      return null;
    }

    return (
      <ReactPaginate
        previousLabel={'❮'}
        nextLabel={'❯'}
        breakLabel={<a role="button" tabIndex="0">...</a>}
        breakClassName={'break-me'}
        pageCount={pageCount}
        initialPage={initialPage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChangeHandler}
        disableInitialCallback
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    );
  }
}

export default Pagination;
