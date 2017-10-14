import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';
// Components
import ModalWrapper from '../common/modal';
import AuthWrapper from '../auth/authWrapper';
import Avatar from '../common/avatar';
import DropdownMenu from '../common/dropdownMenu';
import Navigation from '../navigation';
import * as actionCreators from '../auth/actions';
// Styles
import s from './header.scss';

/**
 * Header Component
 */
class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    roles: PropTypes.array,
    modalOpen: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.avatarClickHandler = this.avatarClickHandler.bind(this);
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
   * Handles avatar click event
   * 
   * @param {bool} visible
   */
  avatarClickHandler(visible) {
    this.setState(() => ({ dropdownVisible: visible }));
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
    const { authenticated, imageUrl, name } = this.props;
    return (
      <div className={s.container}>
        <Navigation>
          <NavLink to="/" activeClassName={s.noActive}>
            Dashboard
          </NavLink>
          {authenticated ? (
            [
              this.renderAuthLinks(),
              <span
                key={`avatar-${name}`}
                role="button"
                tabIndex="0"
                onClick={() => this.avatarClickHandler(true)}
              >
                <Avatar imageUrl={imageUrl} name={name}>
                  <DropdownMenu
                    visible={this.state.dropdownVisible}
                    callbackCloseFn={this.avatarClickHandler}
                  >
                    <Link to="/profile">Profile</Link>
                    <Link to="/signout">Sign out</Link>
                  </DropdownMenu>
                </Avatar>
              </span>,
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
  const { auth: { authenticated }, common: { modalOpen } } = state;
  const { user } = state.auth;

  const newStateToProps = {
    authenticated,
    modalOpen,
    imageUrl: user.imageUrl || '',
    name: user.name || '',
  };

  if (state.auth.user && state.auth.user.roles) {
    newStateToProps.roles = state.auth.user.roles;
  }

  return newStateToProps;
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Header);
