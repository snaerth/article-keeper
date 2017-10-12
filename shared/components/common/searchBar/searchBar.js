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
// Svg
import Search from '../../../assets/images/search.svg';
import Calendar from '../../../assets/images/calendar.svg';
// Styles
import s from './searchBar.scss';

class SearchBar extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitCallback: PropTypes.func.isRequired,
    startDateError: PropTypes.string,
    reset: PropTypes.func.isRequired, // Redux-form reset function
    change: PropTypes.func.isRequired,
    children: PropTypes.node,
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
    this.dateSelectHandler = this.dateSelectHandler.bind(this);
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

  render() {
    const { handleSubmit, submitCallback, startDateError } = this.props;
    const { modalOpen, startDate, endDate } = this.state;

    return (
      <div>
        <form onSubmit={handleSubmit(submitCallback)} noValidate>
          <div className={s.inputContainer}>
            <div>
              <div className={s.searchInputContainer}>
                <Field
                  component={Input}
                  name="search"
                  id="search"
                  type="text"
                  label="Search"
                  placeholder="Search users..."
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
                  <ErrorText
                    key={'startDate'}
                    id={'startDate'}
                    error={startDateError}
                  />
                ) : null}
              </div>
            </div>
            <div>
              <Button
                type="button"
                text="Create"
                ariaLabel="Create user"
                color="purple"
                onClick={(e) => this.openCreateUserModal(e)}
              />
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
          contentLabel={'User modal'}
          exitIconClassName="white"
        >
          <InfiniteCalendar
            width={360}
            height={400}
            theme={infiniteCalendarTheme()}
            min={this.minDate}
            minDate={this.minDate}
            onSelect={this.dateSelectHandler}
          />
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
  const { usersSearch } = state.form;
  const startDateError =
    usersSearch && usersSearch.syncErrors && usersSearch.syncErrors.startDate
      ? usersSearch.syncErrors.startDate
      : '';
  let search = '';

  if (
    state.form.search &&
    state.form.search.values &&
    state.form.search.values.search
  ) {
    search = state.form.search.values.search;
  }

  return {
    search,
    startDateError,
  };
}

export default connect(mapStateToProps, null)(
  reduxForm({
    form: 'usersSearch',
    fields: ['search'],
    validate,
  })(SearchBar),
);
