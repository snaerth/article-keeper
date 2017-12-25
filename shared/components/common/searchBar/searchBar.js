import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import InfiniteCalendar from 'react-infinite-calendar';

// Components
import Input from '../input';
import Button from '../button';
import ModalWrapper from '../modal';
import ErrorText from '../errorText';
// Utils
import infiniteCalendarTheme from '../../../utils/themes';
import { formatInputDate } from '../../../utils/date';
import { formDataToQueryString } from '../../../utils/urlHelpers';
// Svg
import Search from '../../../assets/images/search.svg';
import Calendar from '../../../assets/images/calendar.svg';
// Styles
import s from './searchBar.scss';

class SearchBar extends Component {
  static propTypes = {
    sortBy: PropTypes.object,
    search: PropTypes.string,
    token: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    startDateError: PropTypes.string,
    reset: PropTypes.func.isRequired, // Redux-form reset function
    change: PropTypes.func.isRequired,
    children: PropTypes.node,
    get: PropTypes.func.isRequired,
    query: PropTypes.func.isRequired,
    isFetchingData: PropTypes.func.isRequired,
    formData: PropTypes.shape({
      limit: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.dateTypes = ['startdate', 'enddate'];
    this.minDate = new Date(1930, 1, 1);

    this.state = {
      modalOpen: false,
      startDate: null,
      endDate: null,
      modalDateType: this.dateTypes[0],
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.submitCallback = this.submitCallback.bind(this);
    this.dateSelectHandler = this.dateSelectHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formData !== this.props.formData || nextProps.sortBy !== this.props.sortBy) {
      const { startDate, endDate } = this.state;
      const { search } = this.props;
      let { formData } = nextProps;
      if (search) {
        formData = { limit: 100, page: 1 };
      }

      if (nextProps.sortBy) {
        const { sortBy } = nextProps;
        formData = { ...formData, ...sortBy };
      }

      this.prepareAndSumbit({ search, startDate, endDate }, formData);
    }
  }

  /**
   * Set state to close modal and reset current row data
   */
  closeModal() {
    this.setState(() => ({
      modalOpen: false,
    }));
  }

  /**
   * Sets state property modalShowDate to true
   *
   * @param {String} type
   */
  openModal(type) {
    if (!this.dateTypes.includes(type)) {
      throw Error('Invalid type. Try string startdate or enddate');
    }

    this.setState(() => ({
      modalDateType: type,
      modalOpen: true,
    }));
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
      startDate: null,
      endDate: null,
    }));
  }

  /**
   * On date select handler. Sets state for date
   *
   * @param {Date} date
   */
  dateSelectHandler(date) {
    if (!date) return Error('No date returned from DatePicker');
    const { modalDateType } = this.state;
    const { change } = this.props;

    // SetTimeout delay is because of animation header is laggy
    setTimeout(() => {
      // Set state for startdate or enddate
      if (modalDateType === 'startdate') {
        const startDate = formatInputDate(date);
        this.setState({ startDate });
        change('startDate', startDate);
      } else if (modalDateType === 'enddate') {
        const endDate = formatInputDate(date);
        this.setState({ endDate });
        change('endDate', endDate);
      }
    }, 300);
  }

  /**
   * Callback function to handle form submit event
   *
   * @param {Object}
   */
  submitCallback({ search, startDate, endDate }) {
    this.prepareAndSumbit({ search, startDate, endDate }, this.props.formData);
  }

  /**
   * Prepare data and submit request
   *
   * @param {Object} obj
   * @param {String} obj.search
   * @param {String} obj.startDate
   * @param {String} obj.endDate
   * @param {Object} formData
   */
  prepareAndSumbit({ search, startDate, endDate }, formData) {
    const {
      get, query, isFetchingData, token,
    } = this.props;
    const hasDateRange = startDate && endDate;
    let queryString = formDataToQueryString(formData);

    // Set loading
    isFetchingData();
    if (!search && !hasDateRange) {
      // get
      get({ token, queryString });
    } else {
      if (search && !hasDateRange) {
        // query by text only
        query({ token, queryString: `${search}?${queryString}` });
        return false;
      }

      if (hasDateRange) {
        if (search) {
          // query by text and date range
          queryString = `?query=${search}&startDate=${startDate}&endDate=${endDate}`;
          query({ token, queryString });
          return false;
        }

        // query by date range
        queryString = `?startDate=${startDate}&endDate=${endDate}`;
        query({ token, queryString });
        return false;
      }
    }
  }

  render() {
    const { handleSubmit, startDateError, searchPlaceholder } = this.props;
    const { modalOpen, startDate, endDate } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(this.submitCallback)} noValidate>
          <div className={s.inputContainer}>
            <div>
              <div className={s.searchInputContainer}>
                <Field
                  component={Input}
                  name="search"
                  id="search"
                  type="text"
                  label="Search"
                  placeholder={searchPlaceholder}
                >
                  <Search onClick={handleSubmit} />
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
                  value={startDate}
                >
                  <Calendar onClick={() => this.openModal('startdate')} />
                </Field>
              </div>
            </div>
            <div className={s.dateContainer}>
              <div className={s.date}>
                <Field
                  component={(props) => <Input {...props} required />}
                  name="endDate"
                  id="endDate"
                  type="date"
                  label="End date"
                  value={endDate}
                >
                  <Calendar onClick={() => this.openModal('enddate')} />
                </Field>
              </div>
              <div className={s.date}>
                {startDateError ? (
                  <ErrorText key="startDate" id="startDate" error={startDateError} />
                ) : null}
              </div>
            </div>
            <div>
              {this.props.children}
              <Button
                type="button"
                text="Clear"
                ariaLabel="Clear inputs"
                color="grey"
                onClick={(e) => this.clearInputs(e)}
              />
              <Button type="submit" text="Search" ariaLabel="Search users" />
            </div>
          </div>
        </form>
        <ModalWrapper
          className="mv360"
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel="User modal"
          exitIconClassName="white"
        >
          {modalOpen ? (
            <InfiniteCalendar
              width={360}
              height={400}
              theme={infiniteCalendarTheme()}
              min={this.minDate}
              minDate={this.minDate}
              onSelect={this.dateSelectHandler}
            />
          ) : null}
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
  const { defaultSearch } = state.form;
  const { auth } = state;
  const token = auth && auth.user ? auth.user.token : '';
  const startDateError =
    defaultSearch && defaultSearch.syncErrors && defaultSearch.syncErrors.startDate
      ? defaultSearch.syncErrors.startDate
      : '';
  const search =
    defaultSearch && defaultSearch.values && defaultSearch.values.search
      ? defaultSearch.values.search
      : '';

  return {
    token,
    search,
    startDateError,
  };
}

export default connect(mapStateToProps, null)(
  reduxForm({
    form: 'defaultSearch',
    fields: ['search'],
    validate,
  })(SearchBar),
);
