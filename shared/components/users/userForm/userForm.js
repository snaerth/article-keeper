import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { reduxForm, Field } from 'redux-form';
import InfiniteCalendar from 'react-infinite-calendar';
import * as actionCreators from '../actions';

// Components
import Container from '../../common/container';
import Input from '../../common/input';
import Checkbox from '../../common/checkbox';
import Password from '../../common/password';
import Button from '../../common/button';
import NotifyBox from '../../common/notifyBox';
import FileUploader from '../../common/fileUploader';
import Loader from '../../common/loader';
import ModalWrapper from '../../common/modal';
// Utils
import validateEmail, { isPhoneNumber } from './../../../utils/validate';
import { formDataToQueryString } from './../../../utils/urlHelpers';
import getUserEmail from './../../../utils/userHelper';
import { formatInputDate } from './../../../utils/date';
import infiniteCalendarTheme from './../../../utils/themes';
// Svg
import Person from '../../../assets/images/person.svg';
import Email from '../../../assets/images/email.svg';
import Phone from '../../../assets/images/phone.svg';
import Calendar from '../../../assets/images/calendar.svg';
// Styles
import s from './userForm.scss';

/**
 * UserForm component
 */
class UserForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    errorUser: PropTypes.string,
    infoUser: PropTypes.string,
    image: PropTypes.object,
    type: PropTypes.string.isRequired,
    isFetchingUser: PropTypes.bool.isRequired,
    user: PropTypes.object,
    initialValues: PropTypes.object,
    changeViewHandler: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.minDate = new Date(1930, 1, 1);

    this.state = {
      modalOpen: false,
      dateOfBirth: null,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.dateSelectHandler = this.dateSelectHandler.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.clean();
    if (this.props.type === 'edit') {
      this.props.actions.setUser(this.props.user);
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
   */
  openModal() {
    this.setState(() => ({
      modalOpen: true,
    }));
  }

  /**
   * On date select handler. Sets state for date
   *
   * @param {Date} date
   */
  dateSelectHandler(date) {
    if (!date) return Error('No date returned from DatePicker');
    const { change } = this.props;

    // SetTimeout delay is because of animation header is laggy
    setTimeout(() => {
      const dateOfBirth = formatInputDate(date);
      this.setState({ dateOfBirth });
      change('dateOfBirth', dateOfBirth);
    }, 300);
  }

  /**
   * Handles form submit event
   *
   * @param {Object}
   * @returns {undefined}
   */
  async handleFormSubmit(formValues) {
    const {
      actions, token, type, user: { _id }, image,
    } = this.props;
    // Set loading
    actions.isFetchingUser();

    const {
      dateOfBirth, email, name, password, phone,
    } = formValues;
    const data = {
      dateOfBirth,
      email,
      name,
      password,
      phone,
    };
    data.roles = ['user'];

    if (formValues.admin === true) {
      data.roles.push('admin');
    }

    if (formValues.superuser === true) {
      data.roles.push('superuser');
    }

    let formData = null;
    if (image) {
      formData = new FormData();
      formData.append('image', image);
      formData.append('email', email);
    }

    try {
      switch (type) {
        case 'edit':
          await actions.updateUser(token, _id, data, formData); // eslint-disable-line
          break;

        case 'profile':
          await actions.updateUser(token, _id, data, formData, 'profile'); // eslint-disable-line
          break;

        default:
          await actions.createUser(token, data, formData);
          break;
      }

      const queryString = formDataToQueryString({ limit: 50, page: 1 });
      actions.getUsers({ token, queryString });
    } catch (error) {
      /* Set error  */
    }
  }

  /**
   * Handles on drop for dropzone component
   *
   * @param {Array} acceptedFiles
   * @param {Array} rejectedFiles
   * @returns {undefined}
   */
  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      this.props.errorUser = 'Only images allowed.';
      return;
    }
    if (acceptedFiles.length > 0) {
      this.props.actions.setPreviewUserImage(acceptedFiles[0]);
    }
  }

  /**
   * Renders error message box
   *
   * @param {String} errorMessage - Error message
   * @returns {JSX}
   */
  renderError(error) {
    if (!error) return null;
    return (
      <fieldset>
        <NotifyBox strongText="Error: " text={error} type="error" id="userError" />
      </fieldset>
    );
  }

  /**
   * Renders information message box
   *
   * @param {String} msg - message
   * @returns {JSX}
   */
  renderInfo(msg) {
    if (!msg) return null;
    return (
      <fieldset>
        <NotifyBox text={msg} type="success" id="userUpdated" />
      </fieldset>
    );
  }

  /**
   * Checks type and returns string
   *
   * @param {String} type
   * @returns {String}
   */
  getButtonText(type) {
    if (type === 'edit') return 'Edit';
    if (type === 'create') return 'Create';
    if (type === 'profile') return 'Update';
  }

  render() {
    const {
      handleSubmit,
      errorUser,
      infoUser,
      isFetchingUser,
      changeViewHandler,
      image,
      type,
      user,
    } = this.props;
    const { modalOpen } = this.state;
    const buttonText = this.getButtonText(type);

    return (
      <Container>
        {isFetchingUser ? (
          <Loader absolute>
            {type === 'edit' || type === 'profile' ? 'Updating user' : 'Create new user'}
          </Loader>
        ) : null}
        <div
          className={isFetchingUser ? classnames(s.formContainer, 'almostHidden') : s.formContainer}
        >
          {this.renderInfo(infoUser)}
          {this.renderError(errorUser)}
          <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate autoComplete="off">
            <div className={s.container}>
              <div className={s.row}>
                <fieldset>
                  <Field
                    component={Input}
                    name="name"
                    id="name"
                    type="text"
                    label="Name *"
                    placeholder="Full name"
                  >
                    <Person />
                  </Field>
                </fieldset>
                <fieldset>
                  <Field
                    component={Input}
                    name="email"
                    id="email"
                    type="email"
                    label="Email *"
                    placeholder="someone@example.com"
                  >
                    <Email />
                  </Field>
                </fieldset>
                <fieldset>
                  <Field
                    component={Password}
                    name="password"
                    id="password"
                    type="password"
                    label="Password *"
                    autoComplete="new-password"
                    placeholder="Must have at least 6 characters"
                  />
                </fieldset>
                <fieldset>
                  <Field
                    component={Input}
                    name="phone"
                    id="phone"
                    type="text"
                    label="Phone"
                    placeholder="(555) 555-5555"
                  >
                    <Phone />
                  </Field>
                </fieldset>
                <fieldset>
                  <Field
                    component={(props) => <Input {...props} required />}
                    name="dateOfBirth"
                    id="dateOfBirth"
                    type="date"
                    label="Date of birth"
                  >
                    <Calendar onClick={() => this.openModal()} />
                  </Field>
                </fieldset>
              </div>
              <div className={s.row}>
                <fieldset>
                  <div className={s.profileImageLabel}>
                    <strong>Profile image</strong>
                  </div>
                  <FileUploader
                    accept="image/*"
                    onDrop={this.onDrop}
                    multiple={false}
                    image={image || (user ? user.imageUrl : '')}
                  />
                </fieldset>
                <fieldset>
                  <div>
                    <strong>User roles</strong>
                  </div>
                  <div className={s.checkbox}>
                    <Field
                      component={Checkbox}
                      name="admin"
                      id="admin"
                      type="checkbox"
                      label="Admin"
                    />
                  </div>
                  <div className={s.checkbox}>
                    <Field
                      component={Checkbox}
                      name="superuser"
                      id="superuser"
                      type="checkbox"
                      label="Superuser"
                    />
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={s.editContainer}>
              <div className={s.buttonsContainer}>
                <Button
                  type="button"
                  text="Cancel"
                  ariaLabel="Edit user"
                  color="grey"
                  onClick={() => changeViewHandler(type === 'edit' ? 0 : null)}
                />
                <Button type="submit" text={buttonText} ariaLabel={`${buttonText} user`} />
              </div>
            </div>
          </form>
        </div>
        {modalOpen ? (
          <ModalWrapper
            className="mv360"
            isOpen={modalOpen}
            onRequestClose={this.closeModal}
            contentLabel="User modal"
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
        ) : null}
      </Container>
    );
  }
}

/**
 * Validates form inputs
 *
 * @param {
 *  email:String
 *  password:String
 *  name:String
 *  phone:String
 *  dateOfBirth:Date
 * }
 * @param {Object} props
 * @return {Object} errors
 */
function validate({
  email, password, name, phone, dateOfBirth,
}, props) {
  const { type } = props;
  const errors = {};

  // Email
  if (!validateEmail(email)) {
    errors.email = `Email ${email} is not valid email`;
  }

  if (!email) {
    errors.email = 'Email required';
  }

  if (type === 'create') {
    // Password
    if (!password) {
      errors.password = 'Password required';
    }
  }

  // Password
  if (password && (!/[0-9]/.test(password) || !/[A-Z]/.test(password))) {
    errors.password =
      'Password must contain at least one number (0-9) and one uppercase letter (A-Z)';
  }

  if (password && password.length < 6) {
    errors.password = 'The password must be of minimum length 6 characters';
  }

  // Name
  if (!name) {
    errors.name = 'Name required';
  }

  if (name && (!/^([^0-9]*)$/.test(name) || (name && name.trim().split(' ').length < 2))) {
    errors.name = 'Name has aleast two names consisting of letters';
  }

  // Check if valid date object
  if (dateOfBirth && !Date.parse(dateOfBirth)) {
    errors.dateOfBirth = 'Date is not in valid format. Try DD.MM.YYYY';
  }

  // Check if string is phone number
  if (phone && !isPhoneNumber(phone)) {
    errors.phone = 'Phone is not in valid format. Try (555) 555-5555 or 555-5555';
  }

  return errors;
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @param {Object} ownProps - Components own props
 * @returns {Object}
 */
function mapStateToProps(state, ownProps) {
  const { type } = ownProps;
  const {
    errorUser, infoUser, image, isFetchingUser, user: usr,
  } = state.users;
  const { user: authUser } = state.auth;
  let user = {};
  if (type === 'profile') {
    user = authUser;
  } else if (type === 'edit') {
    user = usr;
  }

  const token = user.token || state.auth.user.token;
  const newProps = {
    image,
    isFetchingUser,
    token,
    errorUser,
    infoUser,
  };

  if (user && type !== 'create') {
    newProps.user = user;

    const {
      name, phone, dateOfBirth, roles, imageUrl,
    } = user;

    newProps.initialValues = {
      name: name || '',
      email: getUserEmail(user),
      password: '',
      image: imageUrl || '',
      phone: phone || '',
      dateOfBirth: dateOfBirth ? formatInputDate(dateOfBirth) : '',
      admin: !!roles.includes('admin'),
      superuser: !!roles.includes('superuser'),
    };
  }

  return newProps;
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'userform',
  fields: ['name', 'email', 'password', 'image', 'phone', 'dateOfBirth', 'admin', 'user'],
  validate,
})(UserForm));
