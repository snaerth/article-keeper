import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import s from './forgotPassword.scss';
import MainHeading from '../../common/mainheading';
import Input from '../../common/input';
import Button from '../../common/button';
import NotifyBox from '../../common/notifyBox';
import validateEmail from './../../../utils/validate';
import * as actionCreators from '../actions';
import Loader from '../../common/loader';
import Email from '../../../assets/images/email.svg';
import ArrowForward from '../../../assets/images/arrow_forward.svg';

/**
 * Signin component
 */
class Signin extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    message: PropTypes.string,
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

  componentWillUnmount() {
    this.props.actions.clean();
  }

  /**
   * Handles form submit event
   *
   * @param {Object}
   * @returns {undefined}
   */
  handleFormSubmit({ email }) {
    this.props.actions.isFetching();
    this.props.actions.forgotPassword({ email });
  }

  /**
   * Renders messages in a notifycation box
   *
   * @returns {JSX}
   */
  renderMessages() {
    const { errorMessage, message } = this.props;
    if (errorMessage) {
      return (
        <fieldset>
          <NotifyBox strongText="Error: " text={errorMessage} type="error" />
        </fieldset>
      );
    } else if (message) {
      return (
        <fieldset>
          <NotifyBox text={message} type="success" />
        </fieldset>
      );
    }

    return null;
  }

  render() {
    const { handleSubmit, isFetching, className } = this.props;

    return (
      <div className={className}>
        {!isFetching ? this.renderMessages() : null}
        {isFetching ? <Loader absolute>Sending email</Loader> : null}
        <div className={isFetching ? 'almostHidden' : ''}>
          <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate autoComplete="off">
            <MainHeading className="medium">Forgot password</MainHeading>
            <fieldset>
              <Field component={Input} name="email" id="email" type="email" label="Email">
                <Email />
              </Field>
            </fieldset>
            <fieldset>
              <div>
                <Button text="Reset password" ariaLabel="Reset password" className="fullWidth">
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
 * Validates form inputs, both email and password
 *
 * @param {String} email
 * @return {Object} errors
 */
function validate({ email }) {
  const errors = {};

  // Email
  if (!validateEmail(email)) {
    errors.email = `Email ${email} is not valid email`;
  }

  if (!email) {
    errors.email = 'Email required';
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
    message: state.auth.message,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'forgotPassword', fields: ['email'], validate })(Signin),
);
