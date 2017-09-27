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
import Person from '../../../assets/images/person.svg';
import Email from '../../../assets/images/email.svg';
import Calendar from '../../../assets/images/calendar.svg';
import s from './editUser.scss';

/**
 * EditUser component
 */
class EditUser extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    error: PropTypes.string,
    image: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    changeViewHandler: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.fileUploaderToggler = this.fileUploaderToggler.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      showImageLoader: false,
    };
  }

  componentWillMount() {
    this.props.actions.clean();
  }

  /**
     * Handles form submit event
     *
     * @param {Object}
     * @returns {undefined}
     * @author Snær Seljan Þóroddsson
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
     * @author Snær Seljan Þóroddsson
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
     * @author Snær Seljan Þóroddsson
     */
  renderError(errorMessage) {
    if (!errorMessage) return null;
    return (
      <fieldset>
        <NotifyBox strongText="Error: " text={errorMessage} type="error" />
      </fieldset>
    );
  }

  /**
     * Toggles showImageLoader state
     *
     * @returns {undefined}
     * @author Snær Seljan Þóroddsson
     */
  fileUploaderToggler() {
    this.setState({
      showImageLoader: !this.state.showImageLoader,
    });
  }

  render() {
    const {
      handleSubmit,
      error,
      isFetching,
      changeViewHandler,
      user: { email },
    } = this.props;

    return (
      <Container>
        {isFetching ? <Loader absolute>Updating user {email}</Loader> : null}
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </fieldset>
            </div>
            <div className={s.row}>
              <fieldset>
                <Field
                  component={(props) => <Input {...props} required />}
                  name="Date of birth"
                  id="dateOfBirth"
                  type="date"
                  label="Date of birth"
                  autoComplete="off"
                >
                  <Calendar />
                </Field>
              </fieldset>
            </div>
            <div className={s.row}>
              <fieldset>
                <Field
                  component={Checkbox}
                  name="roles"
                  id="roles"
                  type="checkbox"
                  label="Roles"
                />
                <Field
                  component={Checkbox}
                  name="user"
                  id="user"
                  type="checkbox"
                  label="Users"
                />
              </fieldset>
            </div>
            <fieldset className={s.noPaddingBottom}>
              <Button
                onClick={() => this.fileUploaderToggler()}
                text="Add profile image"
                color="purple"
                ariaLabel="Add profile image"
                type="button"
                className="fullWidth"
              />
              {this.state.showImageLoader
                ? <FileUploader
                  accept="image/*"
                  onDrop={this.onDrop}
                  multiple={false}
                  image={this.props.image}
                />
                : null}
            </fieldset>
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

  // Date of birth
  if (!dateOfBirth) {
    errors.dateOfBirth = 'Date required';
  }

  if (dateOfBirth && !Date.parse(dateOfBirth)) {
    errors.dateOfBirth = 'Date is not in valid format. Try DD.MM.YYYY';
  }

  // Phone number
  if (!phone) {
    errors.phone = 'Phone required';
  }

  // Check if string is Icelandic phone number
  if (phone && !isPhoneNumber(phone)) {
    errors.phone = 'Phone is not in valid format. Try (555) 555-5555 or 555-5555';
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
  const { error, image, isFetching } = state.users;
  return {
    error,
    image,
    isFetching,
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
    form: 'signup',
    fields: ['name', 'email', 'password', 'image', 'phone', 'roles', 'dateOfBirth'],
    validate,
  })(EditUser),
);
