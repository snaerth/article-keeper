import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import * as actionCreators from './actions';
import LoggerTable from './loggerTable';
import LoggerModalData from './loggerModalData';
import SearchBar from '../common/searchBar';
import Loader from '../common/loader';
import NotifyBox from '../common/notifyBox';
import ModalWrapper from '../common/modal';
import Pagination from '../common/pagination';
// Utils
import createPagination from '../../utils/pagination';
import { formDataToQueryString } from '../../utils/urlHelpers';
// Styles
import tableStyles from '../../styles/table.css';
import s from './logger.scss';

class Logger extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    pagination: PropTypes.object.isRequired,
    search: PropTypes.string,
    change: PropTypes.func,
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      currentRowData: null,
      formData: { limit: 50, page: 1 },
    };

    this.rowClassName = this.rowClassName.bind(this);
    this.onRowClickHandler = this.onRowClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.paginateHandler = this.paginateHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  /**
   * Fetch logs
   */
  componentDidMount() {
    this.props.actions.isFetchingData();
    const { token } = this.props;
    const { formData } = this.state;
    const queryString = formDataToQueryString(formData);
    this.props.actions.getLogs({ token, queryString });
  }

  /**
   * Sets style to even and odd rows
   *
   * @param {index} param0
   * @returns {string} className
   */
  rowClassName({ index }) {
    if (index < 0) {
      return tableStyles.headerRow;
    }
    return index % 2 === 0 ? tableStyles.tableEvenRow : tableStyles.tableOddRow;
  }

  /**
   * Set new state open modal and set current row data for modal
   *
   * @param {Object} event
   * @param {Number} index
   * @param {Object} rowData
   */
  onRowClickHandler(event, index, rowData) {
    this.setState({
      currentRowData: rowData,
      modalOpen: true,
    });
  }

  /**
   * Set state to close modal and reset current row data
   */
  closeModal() {
    this.setState(() => ({
      currentRowData: null,
      modalOpen: false,
    }));
  }

  /**
   * Changes current page state and submits
   *
   * @param  {Object} data
   */
  paginateHandler(data) {
    const formData = { ...this.state.formData };
    formData.page = data.selected + 1;
    this.setState(() => ({ formData }));
    this.prepareAndSumbit(this.props.search, formData);
  }

  /**
   * Delete handler to delete log item
   *
   * @param  {String} id
   */
  deleteHandler(id) {
    const { actions, token } = this.props;
    const queryString = formDataToQueryString(this.state.formData);
    this.closeModal();
    actions.deleteLogById(this.props.token, id);
    actions.getLogs({ token, queryString });
  }

  /**
   * Renders error message box
   *
   * @param {String} error
   * @returns {JSX}
   */
  renderError(error) {
    return (
      <fieldset className="noPadding">
        <NotifyBox strongText="Error: " text={error} type="error" />
      </fieldset>
    );
  }

  render() {
    const {
      data,
      isFetching,
      error,
      pagination,
      reset,
      change,
      actions: { getLogsBySearchQuery, getLogs, isFetchingData },
    } = this.props;
    const { currentRowData, formData, modalOpen } = this.state;

    return (
      <div>
        {error ? this.renderError(error) : null}
        <div className={s.minHeight200}>
          {isFetching ? <Loader absolute>Getting logs...</Loader> : null}
          {data ? (
            <div className={isFetching ? 'almostHidden' : ''}>
              <SearchBar
                submitCallback={this.submitCallback}
                reset={reset}
                change={change}
                query={getLogsBySearchQuery}
                get={getLogs}
                isFetchingData={isFetchingData}
                formData={formData}
              />
              <LoggerTable
                list={data.docs}
                onRowClickHandler={this.onRowClickHandler}
                rowClassName={this.rowClassName}
              />
              <Pagination
                pageCount={pagination.pages || 1}
                initialPage={pagination.page || 1}
                onPageChangeHandler={this.paginateHandler}
              />
            </div>
          ) : null}
        </div>
        <ModalWrapper
          className="mw992"
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={'Log modal'}
          exitIconClassName="white"
        >
          {modalOpen ? (
            <LoggerModalData
              data={currentRowData}
              deleteHandler={this.deleteHandler}
            />
          ) : null}
        </ModalWrapper>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { logs: { error, isFetching, data }, auth } = state;
  const token = auth && auth.user ? auth.user.token : '';
  let pagination = {};

  if (data) {
    const { limit, page, pages, total } = data;
    pagination = createPagination({ limit, pages, page, total });
  }

  return {
    error,
    isFetching,
    token,
    data,
    pagination,
  };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logger);
