import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import InfiniteCalendar from 'react-infinite-calendar';
// Components
import * as actionCreators from './actions';
import UsersTable from './userTable';
import UsersModal from './userModal';
import Loader from '../common/loader';
import Input from '../common/input';
import Button from '../common/button';
import NotifyBox from '../common/notifyBox';
import ModalWrapper from '../common/modal';
import Pagination from '../common/pagination';
import ErrorText from '../common/errorText';
// Utils
import createPagination from '../../utils/pagination';
import infiniteCalendarTheme from '../../utils/themes';
import { formDataToQueryString } from '../../utils/urlHelpers';
import { formatInputDate } from '../../utils/date';
// Svg
import Search from '../../assets/images/search.svg';
import Calendar from '../../assets/images/calendar.svg';
// Styles
import tableStyles from '../../styles/table.css';
import s from './users.scss';

class Users extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    startDateError: PropTypes.string,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    reset: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    user: PropTypes.object,
    search: PropTypes.string,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.dateTypes = ['startdate', 'enddate'];
    this.minDate = new Date(1930, 1, 1);

    this.state = {
      modalOpen: false,
      currentRowData: null,
      formData: { limit: 50, page: 1 },
      focusedInput: null,
      startDate: null,
      endDate: null,
      modalDateType: this.dateTypes[0],
      modalShowDate: false,
    };

    this.rowClassName = this.rowClassName.bind(this);
    this.onRowClickHandler = this.onRowClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.paginateHandler = this.paginateHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.dateSelectHandler = this.dateSelectHandler.bind(this);
  }

  /**
   * Fetch users
   */
  componentDidMount() {
    this.props.actions.isFetchingData();
    const { token } = this.props;
    const { formData } = this.state;
    const queryString = formDataToQueryString(formData);
    this.props.actions.getUsers({ token, queryString });
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
    this.props.actions.setUser(rowData);
    this.setState({
      currentRowData: rowData,
      modalOpen: true,
    });
  }

  /**
   * Clears serach inputs for querying users
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
      modalShowDate: false,
    }));
  }

  /**
   * Sets state property modalShowDate to true
   *
   * @param {String} type
   */
  showDatePicker(type) {
    if (!this.dateTypes.includes(type)) throw Error('Invalid type. Try string startdate or enddate');

    this.setState(() => ({
      modalShowDate: true,
      modalDateType: type,
      modalOpen: true,
    }));
  }

  /**
   * Handles form submit event
   *
   * @param {Object}
   */
  handleFormSubmit({ search }) {
    this.prepareAndSumbit(search, this.state.formData);
  }

  /**
   * Prepare data and submit request
   *
   * @param {String} search
   */
  prepareAndSumbit(search, formData) {
    const { token, actions } = this.props;
    const { startDate, endDate } = this.state;
    const hasDateRange = (startDate && endDate);
    let queryString = formDataToQueryString(formData);

    // Set loading
    actions.isFetchingData();
    if (!search && !hasDateRange) {
      // get all users
      actions.getUsers({ token, queryString });
    } else {
      if (search && !hasDateRange) {
        // query by text only
        actions.getUsersBySearchQuery(token, `${search}?${queryString}`);
        return false;
      }

      if (hasDateRange) {
        if (search) {
          // query by text and date range
          queryString = `?query=${search}&startDate=${startDate}&endDate=${endDate}`;
          actions.getUsersBySearchQuery(token, queryString);
          return false;
        }

        // query by date range
        queryString = `?startDate=${startDate}&endDate=${endDate}`;
        actions.getUsersBySearchQuery(token, queryString);
        return false;
      }
    }
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
   * Delete handler to delete user
   *
   * @param  {String} id
   */
  deleteHandler(id) {
    const { actions, token } = this.props;
    const queryString = formDataToQueryString(this.state.formData);
    this.closeModal();
    actions.deleteUserById(this.props.token, id);
    actions.getUsers({ token, queryString });
  }

  /**
   * On date select handler. Sets state for date
   *
   * @param {Date} date
   */
  dateSelectHandler(date) {
    if (!date) return Error('No date returned from DatePicker');
    const { modalDateType } = this.state;

    // SetTimeout delay is because of animation header is laggy
    setTimeout(() => {
      // Set state for startdate or enddate
      if (modalDateType === 'startdate') {
        const startDate = formatInputDate(date);
        this.setState({ startDate });
        this.props.change('startDate', startDate);
      } else if (modalDateType === 'enddate') {
        const endDate = formatInputDate(date);
        this.setState({ endDate });
        this.props.change('endDate', endDate);
      }
    }, 300);
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
    const { data, isFetching, error, handleSubmit, pagination, user, startDateError } = this.props;

    return (
      <div>
        {error ? this.renderError(error) : null}
        <div className={s.minHeight200}>
          {isFetching ? <Loader absolute>Getting users...</Loader> : null}
          {data ? (
            <div className={isFetching ? 'almostHidden' : ''}>
              <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
                <div className={s.inputContainer}>
                  <div>
                    <div className={s.searchInputContainer}>
                      <Field
                        component={Input}
                        name="search"
                        id="search"
                        type="text"
                        label="Search"
                        placeholder="Search..."
                        hidelabel
                      >
                        <Search onClick={handleSubmit(this.handleFormSubmit)} />
                      </Field>
                    </div>
                  </div>
                  <div className={s.dateContainer}>
                    <div className={s.date}>
                      <Field
                        component={(props) => <Input {...props} required />}
                        name="startDate"
                        id="startDate"
                        type="date"
                        label="Start date"
                        value={this.state.startDate}
                        placeholder="From: "
                        hidelabel
                      >
                        <Calendar onClick={() => this.showDatePicker('startdate')} />
                      </Field>
                    </div>
                    <div className={s.date}>
                      <Field
                        component={(props) => <Input {...props} required />}
                        name="endDate"
                        id="endDate"
                        type="date"
                        label="End date"
                        value={this.state.endDate}
                        placeholder="To: "
                        hidelabel
                      >
                        <Calendar onClick={() => this.showDatePicker('enddate')} />
                      </Field>
                    </div>
                    <div className={s.date}>
                      {startDateError ? <ErrorText key={'startDate'} id={'startDate'} error={startDateError} /> : null}
                    </div>
                  </div>
                  <div>
                    <Button
                      type="button"
                      text="Clear"
                      ariaLabel="Clear inputs"
                      color="grey"
                      onClick={(e) => this.clearInputs(e)}
                    />
                    <Button
                      type="submit"
                      text="Search"
                      ariaLabel="Search users"
                    />
                  </div>
                </div>
              </form>
              <UsersTable
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
          className={!this.state.modalShowDate ? 'mw992' : 'mv360'}
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={'User modal'}
          exitIconClassName="white"
        >
          <div>
            {this.state.modalShowDate ?
              <InfiniteCalendar
                width={360}
                height={400}
                theme={infiniteCalendarTheme()}
                min={this.minDate}
                minDate={this.minDate}
                onSelect={this.dateSelectHandler}
              /> : null}
            {!this.state.modalShowDate && user ?
              <UsersModal deleteHandler={this.deleteHandler} /> : null}
          </div>
        </ModalWrapper>
      </div>
    );
  }
}

/**
 * Valdates if startDate is bigger than endDate
 * @param {startDate:String | endDate:String} object
 */
function validate({ startDate, endDate }) {
  const errors = {};

  if (startDate > endDate) {
    errors.startDate = 'From date is bigger than to date';
  }

  return errors;
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const {
    users: {
      error,
      isFetching,
      data,
      user,
    },
    auth,
    form: {
      usersSearch,
    },
  } = state;

  const token = auth && auth.user ? auth.user.token : '';
  const startDateError = (usersSearch && usersSearch.syncErrors && usersSearch.syncErrors.startDate) ? usersSearch.syncErrors.startDate : '';
  let pagination = {};
  let search = '';

  if (data) {
    const { limit, page, pages, total } = data;
    pagination = createPagination({ limit, pages, page, total });
  }

  if (
    state.form.search &&
    state.form.search.values &&
    state.form.search.values.search
  ) {
    search = state.form.search.values.search;
  }

  return {
    error,
    isFetching,
    token,
    data,
    pagination,
    search,
    user,
    startDateError,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'usersSearch',
    fields: ['search'],
    validate,
  })(Users),
);
