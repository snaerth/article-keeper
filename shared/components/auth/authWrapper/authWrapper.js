import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

// Components
import Signin from '../signin';
import Signup from '../signup';
import SocialsButtons from '../socials';
import ForgotPassword from '../forgotPassword';
import ArrowBackward from '../../../assets/images/arrow_backward.svg';
import s from './authWrapper.scss';

/**
 * AuthWrapper component for sign in, sign up, Forgot password and social buttons
 */
class AuthWrapper extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

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

    // Reset redux isFetching state
    if (index === 0) {
      this.props.actions.isNotFetching();
    }
  }

  render() {
    const { renderOrder } = this.state;

    return (
      <div className={s.container}>
        <div className={s.containerOuter}>
          {!renderOrder[0] ? (
            <div className={s.back}>
              <button onClick={(e) => this.changeAuthComp(e, 0)}>
                <ArrowBackward className={s.iconArrowBackward} />
              </button>
            </div>
          ) : null}
          {renderOrder[0] ? (
            <SocialsButtons className={s.containerAuth} onClick={(e) => this.changeAuthComp(e, 1)}>
              <div className={s.textCenter}>
                <span>No account? </span>
                <Link role="button" to="/signup" onClick={(e) => this.changeAuthComp(e, 2)}>
                  Create one.
                </Link>
              </div>
            </SocialsButtons>
          ) : null}
          {renderOrder[1] ? (
            <Signin className={s.containerAuth} onClick={(e) => this.changeAuthComp(e, 3)} />
          ) : null}
          {renderOrder[2] ? <Signup className={s.containerAuth} /> : null}
          {renderOrder[3] ? <ForgotPassword className={s.containerAuth} /> : null}
        </div>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
