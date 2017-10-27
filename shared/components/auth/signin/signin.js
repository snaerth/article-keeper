import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import classnames from 'classnames';

// Components
import Input from '../../common/input';
import Password from '../../common/password';
import Button from '../../common/button';
import NotifyBox from '../../common/notifyBox';
import MainHeading from '../../common/mainheading';
import validateEmail from './../../../utils/validate';
import Loader from '../../common/loader';
import * as actionCreators from '../actions';
import Email from '../../../assets/images/email.svg';
import ArrowForward from '../../../assets/images/arrow_forward.svg';
import s from './signin.scss';

/**
 * Signin component
 */
class Signin extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signinUser: PropTypes.func,
    actions: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.actions.clean();
  }

  /**
     * Handles form submit event
     * @param {Object}
     * @returns {undefined}
     */
  handleFormSubmit({ email, password }) {
    this.props.actions.isFetching();
    this.props.actions.signinUser({ email, password });
  }

  /**
     * Renders error message box
     *
     * @param {String} error
     * @returns {JSX}
     */
  renderError(error) {
    const { errorMessage } = this.props;
    const msg = errorMessage || error;

    if (!msg) return null;
    return <NotifyBox strongText="Error: " text={msg} type="error" />;
  }

  render() {
    const { handleSubmit, isFetching, onClick, className } = this.props;
    const { iconArrowForward, textCenter, mb25 } = s;

    return (
      <div className={className}>
        {isFetching ? <Loader absolute>Signing in...</Loader> : null}
        <div className={isFetching ? 'almostHidden' : ''}>
          {this.renderError()}
          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            noValidate
            autoComplete="off"
          >
            <MainHeading className="medium">Sign in</MainHeading>
            <fieldset>
              <Field
                component={Input}
                name="email"
                id="email"
                type="email"
                label="Email"
                autoComplete="off"
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
            <fieldset>
              <div>
                <Button
                  text="Sign in"
                  ariaLabel="Sign in"
                  className="fullWidth"
                  color="purple"
                >
                  <ArrowForward className={iconArrowForward} />
                </Button>
              </div>
            </fieldset>
            <div className={classnames(textCenter, mb25)}>
              {onClick ? (
                <Link
                  role="button"
                  to="/forgotpassword"
                  className="link-slideright"
                  onClick={onClick}
                >
                  Forgot password?
                </Link>
              ) : (
                <Link
                  role="button"
                  to="/forgotpassword"
                  className="link-slideright"
                >
                  Forgot password?
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * Validates form inputs, both email and password
 *
 * @param {String} email
 * @param {String} password
 * @return {Object} errors

 */
function validate({ email, password }) {
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

  return errors;
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const initialValues = {
    email: '',
    password: '',
  };

  return {
    errorMessage: state.auth.error,
    isFetching: state.auth.isFetching,
    initialValues,
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
    form: 'signin',
    fields: ['email', 'password'],
    validate,
  })(Signin),
);
