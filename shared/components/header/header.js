import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import s from './header.scss';
import ModalWrapper from '../common/modal';
import AuthWrapper from '../auth/authWrapper';
import Container from '../common/container';
import Navigation from '../navigation';
import * as actionCreators from '../auth/actions';

/**
 * Header Component
 */
class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    roles: PropTypes.array,
    modalOpen: PropTypes.bool,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps() {
    const { authenticated, modalOpen } = this.props;
    if (authenticated && modalOpen) {
      this.closeModal();
    }
  }

  openModal(e) {
    e.preventDefault();
    this.props.actions.openModal();
  }

  closeModal() {
    this.props.actions.closeModal();
  }

  /**
   * Renders links if authenticated
   *
   * @returns {Component} Link
   */
  renderAuthLinks() {
    const { roles } = this.props;

    if (roles && roles.includes('admin')) {
      return [
        <NavLink to="/profile" key="profile" activeClassName={s.active}>
          Profile
        </NavLink>,
        <NavLink to="/admin" key="admin" activeClassName={s.active}>
          Admin
        </NavLink>,
        <NavLink to="/users" key="users" activeClassName={s.active}>
          Users
        </NavLink>,
        <NavLink to="/logs" key="logs" activeClassName={s.active}>
          Logs
        </NavLink>,
      ];
    }

    return [
      <NavLink to="/profile" key="profile" activeClassName={s.active}>
        Profile
      </NavLink>,
    ];
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className={s.container}>
        <Navigation>
          <NavLink to="/" activeClassName={s.noActive}>
            Dashboard
          </NavLink>
          {authenticated ? (
            [
              this.renderAuthLinks(),
              <NavLink to="/signout" key="signout" activeClassName={s.active}>
                Sign out
              </NavLink>,
            ]
          ) : (
            <NavLink to="/signin" role="button" key="signin" onClick={(e) => this.openModal(e)}>
              Sign in / Sign up
            </NavLink>
          )}
        </Navigation>

        <ModalWrapper
          isOpen={this.props.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={'Authentication'}
        >
          <AuthWrapper />
        </ModalWrapper>
      </div>
    );
  }
}

/**
 * Maps dispatch to components props
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Header);
