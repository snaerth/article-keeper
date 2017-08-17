import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimelineLite from 'gsap/TimelineLite';
import Power2 from 'gsap/EasePack';
import classnames from 'classnames';

// Components
import Signup from '../signup';
import SocialsButtons from '../socials';
import Input from '../../input';
import Password from '../../password';
import Button from '../../button';
import NotifyBox from '../../notifyBox';
import MainHeading from '../../mainheading';
import ForgotPassword from '../forgotPassword';
import Loader from '../../common/loader';
import Email from '../../../assets/images//email.svg';
import ArrowForward from '../../../assets/images/arrow_forward.svg';
import ArrowBackward from '../../../assets/images/arrow_backward.svg';
import s from './authWrapper.scss';

/**
 * AuthWrapper component for sign in, sign up, Forgot password and social buttons
 */
class AuthWrapper extends Component {
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
    const { noMarginBottom } = s;

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
  renderSignin(handleSubmit) {
    const { textCenter, container, iconArrowForward, mb25 } = s;

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
        <div className={classnames(textCenter, mb25)}>
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

  render() {
    const { isFetching } = this.props;
    const {
      back,
      iconArrowBackward,
      almostHidden,
      signinContainer,
      socialsContainer,
      container,
      pink,
      textCenter,
    } = s;
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
                <p className={textCenter}>
                  <Link
                    role="button"
                    to="/signin"
                    className={pink}
                    onClick={(e) => this.toggleView(e, 1)}
                  >
                    Sign in
                  </Link>
                  <span /> or <span />
                  <Link
                    role="button"
                    to="/signup"
                    className={pink}
                    onClick={(e) => this.toggleView(e, 3)}
                  >
                    Sign up
                  </Link>
                  <span /> with email
                </p>
              </div>
              {/**/}
              <div className={container} ref={(c) => this.el3 = c}>
                <Signup />
              </div>
              <div ref={(c) => this.el2 = c} className={container}>
                <MainHeading text="Reset password" className="medium" />
                <ForgotPassword hideHeading />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthWrapper;
