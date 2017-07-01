import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import styles from './header.scss';
import ModalWrapper from '../modal';
import Signup from '../../auth/signup';
import Signin from '../../auth/signin';
import * as actionCreators from '../../auth/actions';

/**
 * Header Component
 */
class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    roles: PropTypes.array,
    name: PropTypes.string,
    modalOpen: PropTypes.bool,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeModal: 'signin',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeModalComponent = this.changeModalComponent.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.modalOpen) {
      this.closeModal();
    }
  }

  openModal() {
    this.props.actions.openModal();
  }

  closeModal() {
    this.props.actions.closeModal();
  }

  /**
     * Changes state for modal component and opens modal
     * @param {String} modalName
     */
  changeModalComponent(modalName) {
    this.setState({
      activeModal: modalName === 'signup' ? 'signup' : 'signin',
    });
    this.openModal();
  }

  /**
     * Renders auth links. If authenticated then signout link
     * else signin and signup
     * @returns {Component} Link
     */
  renderAuthLinks() {
    if (this.props.authenticated) {
      const links = [
        <Link
          to="/profile"
          key="profile"
          active={styles.active}
          className={styles.link}
        >
          Profile
        </Link>,
        <Link
          to="/signout"
          key="signout"
          active={styles.active}
          className={styles.link}
        >
          Sign out
        </Link>,
      ];

      if (this.props.roles && this.props.roles.indexOf('admin') > -1) {
        links.unshift(
          <Link
            to="/admin"
            key="admin"
            active={styles.active}
            className={styles.link}
          >
            Admin
          </Link>,
        );
      }

      return links;
    }
    return [
      <Link
        to="#"
        role="button"
        key="signin"
        className={styles.link}
        onClick={() => this.changeModalComponent('signin')}
      >
        Sign in
      </Link>,
      <Link
        to="#"
        role="button"
        key="signup"
        className={styles.link}
        onClick={() => this.changeModalComponent('signup')}
      >
        Sign up
      </Link>,
    ];
  }

  render() {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <nav className={styles.navUpper}>
            <div>
              <Link
                to="/"
                className={classnames(
                  styles.home_link,
                  styles.link,
                  styles.active,
                )}
              >
                Home
              </Link>
            </div>
            <div className={styles.links_right}>
              {this.renderAuthLinks()}
            </div>
          </nav>
          <CSSTransitionGroup
            transitionName="slideInOut"
            transitionEnterTimeout={700}
            transitionLeaveTimeout={100}
          >
            <h1 className={styles.banner} key={this.props.name}>
              {this.props.name}
            </h1>
          </CSSTransitionGroup>
        </div>

        <ModalWrapper
          isOpen={this.props.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={this.state.activeModal}
        >
          {this.state.activeModal === 'signin' ? <Signin /> : <Signup />}
        </ModalWrapper>
      </div>
    );
  }
}

/**
 * Maps dispatch to components props
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

/**
 * Maps state to props
 * @param {Object} state - Application state
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  const { authenticated } = state.auth;
  const { modalOpen } = state.common;
  const newStateToProps = {
    authenticated,
    modalOpen,
  };

  if (state.auth.user && state.auth.user.roles) {
    newStateToProps.roles = state.auth.user.roles;
  }

  return newStateToProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
