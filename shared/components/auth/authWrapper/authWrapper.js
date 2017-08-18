import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import Signin from '../signin';
import Signup from '../signup';
import SocialsButtons from '../socials';
import MainHeading from '../../mainheading';
import ForgotPassword from '../forgotPassword';
import ArrowBackward from '../../../assets/images/arrow_backward.svg';
import s from './authWrapper.scss';

/**
 * AuthWrapper component for sign in, sign up, Forgot password and social buttons
 */
class AuthWrapper extends Component {
  constructor(props) {
    super(props);

    this.changeAuthComp = this.changeAuthComp.bind(this);
    this.state = {
      renderOrder: [true, false, false, false],
    };
  }

  /**
   * Change render order state for active components
   *
   * @param {Object} e
   * @param {Int} index
   * @returns {undefined}
   */
  changeAuthComp(e, index) {
    e.preventDefault();
    const { renderOrder } = this.state;
    // set all items in array to false
    const newOrder = renderOrder.map(() => false);
    // set active state by index
    newOrder[index] = !newOrder[index];
    this.setState(() => ({ renderOrder: newOrder }));
  }

  render() {
    const { renderOrder } = this.state;

    return (
      <div className={s.container}>
        <div className={s.containerOuter}>
          {!renderOrder[0]
            ? <div className={s.back}>
              <button
                className="link-slideright"
                onClick={(e) => this.changeAuthComp(e, 0)}
              >
                <ArrowBackward className={s.iconArrowBackward} />
              </button>
            </div>
            : null}
          {renderOrder[0]
            ? <SocialsButtons className={s.containerAuth}>
              <p className={s.textCenter}>
                <Link
                  role="button"
                  to="/signin"
                  className={s.pink}
                  onClick={(e) => this.changeAuthComp(e, 1)}
                >
                    Sign in
                  </Link>
                <span /> or <span />
                <Link
                  role="button"
                  to="/signup"
                  className={s.pink}
                  onClick={(e) => this.changeAuthComp(e, 2)}
                >
                    Sign up
                  </Link>
                <span /> with email
                </p>
            </SocialsButtons>
            : null}
          {renderOrder[1]
            ? <Signin
              className={s.containerAuth}
              onClick={(e) => this.changeAuthComp(e, 3)}
            />
            : null}
          {renderOrder[2] ? <Signup className={s.containerAuth} /> : null}
          {renderOrder[3]
            ? <ForgotPassword className={s.containerAuth} />
            : null}
        </div>
      </div>
    );
  }
}

export default AuthWrapper;
