import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { DateRangePicker } from 'react-dates';

import {
  getLogs,
  isFetchingData,
  isNotFetchingData,
  getLogsBySearchQuery,
} from './actions';
import LoggerTable from './loggerTable';
import LoggerModalData from './loggerModalData';
import Loader from '../common/loader';
import Input from '../common/input';
import Button from '../common/button';
import NotifyBox from '../common/notifyBox';
import ModalWrapper from '../common/modal';
import Pagination from '../common/pagination';
import createPagination from '../../utils/pagination';
import { formDataToQueryString } from '../../utils/urlHelpers';
import Search from '../../assets/images/search.svg';

// Styles
import tableStyles from '../../styles/table.css';
import styles from './logger.scss';

class Logger extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      currentRowData: null,
      formData: { limit: 50, page: 1 },
      focusedInput: null,
      startDate: null,
      endDate: null,
    };

    this.rowClassName = this.rowClassName.bind(this);
    this.onRowClickHandler = this.onRowClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.paginateHandler = this.paginateHandler.bind(this);
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    serverError: PropTypes.string,
    reset: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    search: PropTypes.string,
  };

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
   * Clears serach inputs for querying logs
   *
   * @param {Object} event
   */
  clearInputs(event) {
    event.preventDefault();
    this.props.reset();
    this.setState(() => ({
      focusedInput: null,
      startDate: null,
      endDate: null,
    }));
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
   * Handles form submit event
   * @param {Object}
   */
  handleFormSubmit({ search }) {
    this.prepareAndSumbit(search, this.state.formData);
  }

  /**
   * Prepare data and submit request
   * @param {String} search
   */
  prepareAndSumbit(search, formData) {
    // Set loading
    this.props.actions.isFetchingData();
    const { token, actions } = this.props;
    const { startDate, endDate } = this.state;
    const hasDateRange = startDate && endDate;
    let queryString = formDataToQueryString(formData);

    if (!search && !hasDateRange) {
      // get all logs
      this.props.actions.getLogs({ token, queryString });
    } else {
      if (search && !hasDateRange) {
        // query by text only
        actions.getLogsBySearchQuery(token, `${search}?${queryString}`);
        return false;
      }

      if (hasDateRange) {
        const sd = startDate.format('YYYY-MM-DD');
        const ed = endDate.format('YYYY-MM-DD');

        if (search) {
          // query by text and date range
          queryString = `${search}?startDate=${sd}&endDate=${ed}`;
          actions.getLogsBySearchQuery(token, queryString);
          return false;
        }

        // query by date range
        queryString = `${sd}/${ed}`;
        actions.getLogsBySearchQuery(token, queryString);
        return false;
      }
    }
  }

  paginateHandler(page) {
    const formData = { ...this.state.formData };
    formData.page = page;
    this.setState(() => ({ formData }));
    this.prepareAndSumbit(this.props.search, formData);
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
      serverError,
      handleSubmit,
      pagination,
    } = this.props;
    const { currentRowData } = this.state;

    return (
      <div>
        {error ? this.renderError(error) : null}
        {serverError ? this.renderError(serverError) : null}
        <div className={styles.minHeight200}>
          {isFetching ? <Loader absolute>Getting logs...</Loader> : null}
          {!isFetching && data
            ? <div>
              <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
                <div className={styles.inputContainer}>
                  <div>
                    <div className={styles.searchInputContainer}>
                      <Field
                        component={Input}
                        name="search"
                        id="search"
                        type="text"
                        label="Search"
                        placeholder="Search..."
                        hidelabel
                      >
                        <Search
                          className={styles.searchIcon}
                          onClick={handleSubmit(this.handleFormSubmit)}
                        />
                      </Field>
                    </div>
                  </div>
                  <div>
                    <DateRangePicker
                      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                      onDatesChange={({ startDate, endDate }) =>
                          this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={(focusedInput) =>
                          this.setState({ focusedInput })}
                      isOutsideRange={() => false}
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      text="Clear"
                      ariaLabel="Clear inputs"
                      color="green"
                      onClick={(e) => this.clearInputs(e)}
                    />
                    <Button
                      type="submit"
                      text="Search"
                      ariaLabel="Search logs"
                    />
                  </div>
                </div>
              </form>
              <LoggerTable
                list={data.docs}
                onRowClickHandler={this.onRowClickHandler}
                rowClassName={this.rowClassName}
              />
              {pagination
                  ? <Pagination
                    page={pagination.page}
                    pages={pagination.pages}
                    onClick={this.paginateHandler}
                  />
                  : null}
            </div>
            : null}
        </div>
        <ModalWrapper
          className="mw992"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={'Authentication'}
        >
          <LoggerModalData data={currentRowData} />
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
  const { error, isFetching, data } = state.logs;
  const serverError = state.common.error;
  const token = state.auth && state.auth.user ? state.auth.user.token : '';
  let pagination = {};
  let search = '';

  if (data) {
    const { limit, page, pages, total } = data;
    pagination = createPagination({ limit, pages, page, total });
  }

  if (state.form.search && state.form.search.values && state.form.search.values.search) {
    search = state.form.search.values.search;
  }

  return { error, serverError, isFetching, token, data, pagination, search };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { getLogs, isFetchingData, isNotFetchingData, getLogsBySearchQuery },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'search',
    fields: ['search'],
  })(Logger),
);
