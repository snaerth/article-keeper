import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actionCreators from '../actions';

// Components
import Input from '../../common/input';
import Password from '../../common/password';
import Button from '../../common/button';
import MainHeading from '../../common/mainheading';
import NotifyBox from '../../common/notifyBox';
import Loader from '../../common/loader';
import validateEmail from './../../../utils/validate';
import Person from '../../../assets/images/person.svg';
import Email from '../../../assets/images/email.svg';
import ArrowForward from '../../../assets/images/arrow_forward.svg';
import s from './signup.scss';

/**
 * Signup component
 */
class Signup extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signupUser: PropTypes.func,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    className: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

    try {
      await this.props.actions.signupUser({
        email,
        password,
        name,
      });
      this.props.history.push('/profile');
    } catch (error) {
      // No need to do something with error because error is already handled
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
    return <NotifyBox strongText="Error: " text={errorMessage} type="error" />;
  }

  render() {
    const {
      handleSubmit, errorMessage, isFetching, className,
    } = this.props;

    return (
      <div className={className}>
        {isFetching ? <Loader absolute>Signing up</Loader> : null}
        <div className={isFetching ? 'almostHidden' : ''}>
          {this.renderError(errorMessage)}
          <MainHeading className="medium">Sign up with email</MainHeading>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate autoComplete="off">
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
            <fieldset>
              <Field
                component={Password}
                name="password"
                id="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                placeholder="Must have at least 6 characters"
              />
            </fieldset>
            <fieldset className={s.fieldsetButton}>
              <div>
                <Button text="Sign up" ariaLabel="Sign up" className="fullWidth" color="purple">
                  <ArrowForward className={s.iconArrowForward} />
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
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
function validate({ email, password, name }) {
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

  if (!/^([^0-9]*)$/.test(name) || (name && name.trim().split(' ').length < 2)) {
    errors.name = 'Name has aleast two names consisting of letters';
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
  return {
    errorMessage: state.auth.error,
    image: state.auth.image,
    isFetching: state.auth.isFetching,
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  fields: ['name', 'email', 'password'],
  validate,
})(Signup));
