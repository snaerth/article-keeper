import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TimelineLite, Power2 } from 'gsap';
import classnames from 'classnames';
import SocialsButtons from '../socials';
import Input from '../../input';
import Password from '../../password';
import Button from '../../button';
import NotifyBox from '../../notifyBox';
import MainHeading from '../../mainheading';
import ForgotPassword from '../forgotPassword';
import validateEmail from './../../../utils/validate';
import getParameterByName from './../../../utils/queryParams';
import Loader from '../../common/loader';
import * as actionCreators from '../actions';
import Email from '../../../assets/images//email.svg';
import ArrowForward from '../../../assets/images/arrow_forward.svg';
import ArrowBackward from '../../../assets/images/arrow_backward.svg';
import styles from './signin.scss';

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
  };

  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      currentSlide: 0,
    };
  }

  componentWillMount() {
    this.props.actions.clean();
  }

  componentDidMount() {
    const error = getParameterByName('error');
    if (error) {
      this.renderError(error);
    }
  }

  /**
     * Handles form submit event
     * @param {Object}
     * @returns {undefined}
     * @author Snær Seljan Þóroddsson
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
     * @author Snær Seljan Þóroddsson
     */
  renderError(error) {
    const { errorMessage } = this.props;
    const msg = errorMessage || error;
    const { noMarginBottom } = styles;

    if (!msg) return null;
    return (
      <fieldset>
        <NotifyBox
          strongText="Error: "
          text={msg}
          type="error"
          className={noMarginBottom}
        />
      </fieldset>
    );
  }

  /**
     * Toggles signin views BUTTONS or SIGN IN with email
     * @param {Object} e - Click handler event
     * @param {Int} slideNumber = Slide number index
     * @param {bool} back
     * @returns {undefined}
     * @author Snær Seljan Þóroddsson
     */
  toggleView(e, slideNumber, back) {
    e.preventDefault();
    this.props.actions.clean();
    let { currentSlide } = this.state;
    const cS = currentSlide === 0 ? currentSlide : currentSlide - 1;
    const sN = slideNumber || cS;
    let forward = true;
    let firstEl = this[`el${currentSlide}`];
    let secondEl = this[`el${sN}`];

    // Check if backwards
    if (back) {
      forward = false;
      firstEl = this[`el${sN}`];
      secondEl = this[`el${currentSlide}`];
    }

    this.animateSlide(firstEl, secondEl, forward, sN);
    currentSlide = sN;
    this.setState({ currentSlide });
  }

  /**
   * Animates slidein
   * @param {Object} firstEl
   * @param {Object} secondEl
   * @param {bool} forward
   * @param {Int} slideNumber
   * @returns {undefined}
   * @author Snær Seljan Þóroddsson
   */
  animateSlide(firstEl, secondEl, forward, slideNumber) {
    const tl = new TimelineLite();
    const multiplier = slideNumber;

    if (forward) {
      tl
        .to(firstEl, 0.2, {
          x: `-${100 * multiplier}%`,
          opacity: 1,
          ease: Power2.easeOut,
        })
        .to(secondEl, 0.2, {
          x: `-${100 * multiplier}%`,
          opacity: 1,
          ease: Power2.easeOut,
        });
    } else {
      tl
        .to(secondEl, 0.2, {
          x: `10 + ${multiplier * 100}%`,
          opacity: 1,
          ease: Power2.easeOut,
        })
        .to(firstEl, 0.2, {
          x: `-${100 * multiplier}%`,
          opacity: 1,
          ease: Power2.easeOut,
        });
    }
  }

  /**
  * Renders sign in form with email and password
  * @param {func} handleSubmit
  * @returns {undefined}
  */
  renderForm(handleSubmit) {
    const {
      forgotPasswordContainer,
      container,
      iconArrowForward,
      mb25,
    } = styles;

    return (
      <form
        onSubmit={handleSubmit(this.handleFormSubmit)}
        noValidate
        ref={(c) => this.el1 = c}
        className={container}
      >
        <MainHeading text="Sign in with email" className="medium" />
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
            placeholder="Must have at least 6 characters"
          />
        </fieldset>
        <fieldset>
          <div>
            <Button text="Sign in" ariaLabel="Sign in" className="fullWidth">
              <ArrowForward className={iconArrowForward} />
            </Button>
          </div>
        </fieldset>
        <div className={classnames(forgotPasswordContainer, mb25)}>
          <Link
            role="button"
            to="/forgotpassword"
            className="link-slideright"
            onClick={(e) => this.toggleView(e, 2)}
          >
            Forgot password?
          </Link>
        </div>
      </form>
    );
  }

  /**
     * Renders ForgotPassword component
     *
     * @returns {undefined}
     */
  renderForgotPassword() {
    const { container } = styles;

    return (
      <div ref={(c) => this.el2 = c} className={container}>
        <MainHeading text="Reset password" className="medium" />
        <ForgotPassword hideHeading />
      </div>
    );
  }

  render() {
    const { handleSubmit, isFetching } = this.props;
    const {
      back,
      iconArrowBackward,
      almostHidden,
      signinContainer,
      socialsContainer,
    } = styles;
    const { currentSlide } = this.state;

    return (
      <div className="cardContainer">
        <div className="card">
          {currentSlide
            ? <div className={back}>
              <button
                className="link-slideright"
                onClick={(e) => this.toggleView(e, null, true)}
              >
                <ArrowBackward className={iconArrowBackward} />
              </button>
            </div>
            : null}
          {isFetching ? <Loader>Signing in...</Loader> : null}
          <div className={isFetching ? almostHidden : ''}>
            {this.renderError()}
            <div className={signinContainer}>
              <div className={socialsContainer} ref={(c) => this.el0 = c}>
                <SocialsButtons toggleView={(e) => this.toggleView(e, 1)} />
              </div>
              {this.renderForm(handleSubmit)}
              {this.renderForgotPassword()}
            </div>
          </div>
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
 * @author Snær Seljan Þóroddsson
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
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  return { errorMessage: state.auth.error, isFetching: state.auth.isFetching };
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
  reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
    validate,
  })(Signin),
);
