import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styles from './forgotPassword.scss';
import MainHeading from '../../common/mainheading';
import Input from '../../common/input';
import Button from '../../common/button';
import NotifyBox from '../../common/notifyBox';
import validateEmail from './../../../utils/validate';
import * as actionCreators from '../actions';
import Spinner from '../../common/spinner';
import Email from '../../../common/svg/email.svg';
import ArrowForward from '../../../common/svg/arrow_forward.svg';

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
    hideHeading: PropTypes.bool,
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
  handleFormSubmit({ email }) {
    this.props.actions.isFetching();
    this.props.actions.forgotPassword({ email });
  }

  /**
     * Renders messages in a notifycation box
     *
     * @returns {JSX}
     * @author Snær Seljan Þóroddsson
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
    const { handleSubmit, isFetching, hideHeading } = this.props;

    return (
      <div className="cardContainer">
        <div className="card">
          {!isFetching ? this.renderMessages() : null}
          {isFetching
            ? <Spinner>Loading</Spinner>
            : <div>
              {!hideHeading
                  ? <MainHeading text="Lost password" className="medium" />
                  : null}
              <form
                onSubmit={handleSubmit(this.handleFormSubmit)}
                noValidate
                autoComplete="off"
              >
                <fieldset>
                  <Field
                    component={Input}
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                  >
                    <Email />
                  </Field>
                </fieldset>
                <fieldset>
                  <div>
                    <Button
                      text="Reset password"
                      ariaLabel="Reset password"
                      className="fullWidth"
                    >
                      <ArrowForward className={styles.iconArrowForward} />
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>}
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
 * @author Snær Seljan Þóroddsson
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
 * @author Snær Seljan Þóroddsson
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
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'forgotPassword', fields: ['email'], validate })(Signin),
);
