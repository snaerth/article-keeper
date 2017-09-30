import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { reduxForm, Field } from 'redux-form';
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
import validateEmail, { isPhoneNumber } from './../../../utils/validate';
import getUserEmail from './../../../utils/userHelper';
import { formatInputDate } from './../../../utils/date';
import Person from '../../../assets/images/person.svg';
import Email from '../../../assets/images/email.svg';
import Phone from '../../../assets/images/phone.svg';
import Calendar from '../../../assets/images/calendar.svg';
import s from './userForm.scss';

/**
 * UserForm component
 */
class UserForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    error: PropTypes.string,
    image: PropTypes.object,
    type: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object,
    changeViewHandler: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    this.props.actions.clean();
  }

  /**
     * Handles form submit event
     *
     * @param {Object}
     * @returns {undefined}
     */
  async handleFormSubmit({ email, password, name }) {
    this.props.actions.isFetching();

    // TODO make async promise or something to wait for signup user
    let formData = null;

    if (this.props.image) {
      formData = new FormData();
      formData.append('image', this.props.image);
    }

    try {
      await this.props.actions.updateUser({
        email,
        password,
        name,
        formData,
      });
    } catch (error) {
      // No need to do something with error because error is already handled
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
      this.props.error = 'Only images allowed.';
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
  renderError(errorMessage) {
    if (!errorMessage) return null;
    return (
      <fieldset>
        <NotifyBox strongText="Error: " text={errorMessage} type="error" />
      </fieldset>
    );
  }

  render() {
    const {
      handleSubmit,
      error,
      isFetching,
      changeViewHandler,
      image,
      type,
      user,
    } = this.props;

    return (
      <Container>
        {isFetching
          ? <Loader absolute>
            {type === 'edit' && user
              ? `Edit user ${user.email}`
              : 'Create new user'}
          </Loader>
          : null}
        <div
          className={
            isFetching
              ? classnames(s.formContainer, 'almostHidden')
              : s.formContainer
          }
        >
          {this.renderError(error)}
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            noValidate
            autoComplete="off"
          >
            <div className={s.row}>
              <fieldset>
                <Field
                  component={Input}
                  name="name"
                  id="name"
                  type="text"
                  label="Name"
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
                  label="Email"
                  placeholder="someone@example.com"
                >
                  <Email />
                </Field>
              </fieldset>
            </div>
            <div className={s.row}>
              <fieldset>
                <Field
                  component={Password}
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
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
            </div>
            <div className={s.row}>
              <fieldset>
                <Field
                  component={(props) => <Input {...props} required />}
                  name="dateOfBirth"
                  id="dateOfBirth"
                  type="date"
                  label="Date of birth"
                >
                  <Calendar />
                </Field>
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
                    name="user"
                    id="user"
                    type="checkbox"
                    label="Users"
                  />
                </div>
              </fieldset>
            </div>
            <div className={s.row}>
              <fieldset>
                <div>
                  <strong>Profile image</strong>
                </div>
                <FileUploader
                  accept="image/*"
                  onDrop={this.onDrop}
                  multiple={false}
                  image={image || user ? user.imageUrl : ''}
                />
              </fieldset>
            </div>
          </form>
          <div className={s.editContainer}>
            <div className={s.pullRight}>
              <Button
                type="button"
                text="Cancel"
                ariaLabel="Edit user"
                color="grey"
                onClick={() => changeViewHandler(0)}
              />
              <Button
                type="button"
                text="Edit"
                ariaLabel="Edit user"
                color="blue"
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

/**
 * Validates form inputs, both email, password and message
 *
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @return {Object} errors
 * @author Snær Seljan Þóroddsson
 */
function validate({ email, password, name, phone, dateOfBirth }) {
  const errors = {};

  // Email
  if (!validateEmail(email)) {
    errors.email = `Email ${email} is not valid email`;
  }

  if (!email) {
    errors.email = 'Email required';
  }

  // Password
  if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password =
      'Password must contain at least one number (0-9) and one uppercase letter (A-Z)';
  }

  if (password && password.length < 6) {
    errors.password = 'The password must be of minimum length 6 characters';
  }

  if (!password) {
    errors.password = 'Password required';
  }

  // Name
  if (!name) {
    errors.name = 'Name required';
  }

  if (
    !/^([^0-9]*)$/.test(name) || (name && name.trim().split(' ').length < 2)
  ) {
    errors.name = 'Name has aleast two names consisting of letters';
  }

  // Check if valid date object
  if (dateOfBirth && !Date.parse(dateOfBirth)) {
    errors.dateOfBirth = 'Date is not in valid format. Try DD.MM.YYYY';
  }

  // Check if string is phone number
  if (phone && !isPhoneNumber(phone)) {
    errors.phone =
      'Phone is not in valid format. Try (555) 555-5555 or 555-5555';
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
  const { error, image, isFetching } = state.users;
  const newProps = {
    error,
    image,
    isFetching,
  };

  if (ownProps.user) {
    const { name, phone, dateOfBirth, roles, imageUrl } = ownProps.user;
    newProps.initialValues = {
      name: name || '',
      email: ownProps.user ? getUserEmail(ownProps.user) : '',
      password: '',
      image: imageUrl || '',
      phone: phone || '',
      dateOfBirth: dateOfBirth ? formatInputDate(dateOfBirth) : '',
      admin: !!roles.includes('admin'),
      user: !!roles.includes('user'),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'userform',
    fields: [
      'name',
      'email',
      'password',
      'image',
      'phone',
      'dateOfBirth',
      'admin',
      'user',
    ],
    validate,
  })(UserForm),
);
