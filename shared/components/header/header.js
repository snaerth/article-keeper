import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import s from './header.scss';
import ModalWrapper from '../modal';
import Signup from '../auth/signup';
import Signin from '../auth/signin';
import Container from '../container';
import Navigation from '../navigation';
import * as actionCreators from '../auth/actions';

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
   * @returns {undefined}
   */
  changeModalComponent(e, modalName) {
    e.preventDefault();

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
        <NavLink to="/profile" key="profile" activeClassName={s.active}>
          Profile
        </NavLink>,
        <NavLink to="/signout" key="signout" activeClassName={s.active}>
          Sign out
        </NavLink>,
      ];

      if (this.props.roles && this.props.roles.indexOf('admin') > -1) {
        links.unshift(
          <NavLink to="/admin" key="admin" activeClassName={s.active}>
            Admin
          </NavLink>,
        );
      }

      return links;
    }
    return [
      <NavLink
        to="/signin"
        role="button"
        key="signin"
        onClick={e => this.changeModalComponent(e, 'signin')}
      >
        Sign in
      </NavLink>,
      <NavLink
        to="/signup"
        role="button"
        key="signup"
        onClick={e => this.changeModalComponent(e, 'signup')}
      >
        Sign up
      </NavLink>,
    ];
  }

  render() {
    return (
      <div className={s.background}>
        <Container>
          <Navigation>
            <NavLink to="/">Home</NavLink>
            {this.renderAuthLinks()}
          </Navigation>
          <h1 className={s.bannerText} key={this.props.name}>
            {this.props.name}
          </h1>
        </Container>

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
