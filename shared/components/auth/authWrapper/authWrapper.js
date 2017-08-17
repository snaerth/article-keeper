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
      order: [true, false, false, false],
    };
  }

  changeAuthComp(index) {
    const { order } = this.state;
    const newOrder = order.map(() => false);
    newOrder[index] = !newOrder[index];
    this.setState(() => ({ order: newOrder }));
  }

  render() {
    const { order } = this.state;

    return (
      <div className={s.container}>
        <div className={s.containerOuter}>
          {!order[0]
            ? <div className={s.back}>
              <button
                className="link-slideright"
                onClick={() => this.changeAuthComp(0)}
              >
                <ArrowBackward className={s.iconArrowBackward} />
              </button>
            </div>
            : null}
          {order[0]
            ? <div className={s.containerAuth}>
              <SocialsButtons />
              <p className={s.textCenter}>
                <Link
                  role="button"
                  to="/signin"
                  className={s.pink}
                  onClick={() => this.changeAuthComp(1)}
                >
                    Sign in
                  </Link>
                <span /> or <span />
                <Link
                  role="button"
                  to="/signup"
                  className={s.pink}
                  onClick={() => this.changeAuthComp(2)}
                >
                    Sign up
                  </Link>
                <span /> with email
                </p>
            </div>
            : null}
          {order[1]
            ? <Signin
              className={s.containerAuth}
              onClick={() => this.changeAuthComp(3)}
            />
            : null}
          {order[2] ? <Signup className={s.containerAuth} /> : null}
          {order[3]
            ? <div>
              <MainHeading text="Reset password" className="medium" />
              <ForgotPassword hideHeading />
            </div>
            : null}
        </div>
      </div>
    );
  }
}

export default AuthWrapper;
