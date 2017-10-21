import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
// Components
import ModalWrapper from '../common/modal';
import AuthWrapper from '../auth/authWrapper';
import Avatar from '../common/avatar';
import DropdownMenu from '../common/dropdownMenu';
import Navigation from '../navigation';
import { openModal, closeModal } from '../auth/actions';
import { closeMenu, openMenu } from '../../common/actions';
// Styles
import s from './header.scss';

/**
 * Header Component
 */
class Header extends PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool,
    roles: PropTypes.array,
    modalOpen: PropTypes.bool.isRequired,
    menuOpen: PropTypes.bool.isRequired,
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
    this.menuClickHandler = this.menuClickHandler.bind(this);
  }

  componentWillReceiveProps() {
    const { authenticated, modalOpen } = this.props;
    if (authenticated && modalOpen) {
      this.closeModal();
    }
  }

  menuClickHandler() {
    const { menuOpen, actions } = this.props;
    if (!menuOpen) {
      actions.openMenu();
    } else {
      actions.closeMenu();
    }
  }

  openModal() {
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
  avatarClickHandler = (visible) => {
    this.setState(() => ({ dropdownVisible: visible }));
  };

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
        <Navigation onClick={this.menuClickHandler}>
          <NavLink to="/" activeClassName={s.noActive}>
            Dashboard
          </NavLink>
          {authenticated ? (
            <span key="last-menu-item">
              <Avatar imageUrl={imageUrl} name={name} callbackOpenFn={this.avatarClickHandler}>
                <DropdownMenu
                  visible={this.state.dropdownVisible}
                  callbackCloseFn={this.avatarClickHandler}
                >
                  <Link to="/profile">Profile</Link>
                  <Link to="/signout">Sign out</Link>
                </DropdownMenu>
              </Avatar>
            </span>
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
    actions: bindActionCreators({ closeMenu, openMenu, openModal, closeModal }, dispatch),
  };
}

/**
 * Maps state to props
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { auth: { authenticated }, common: { modalOpen, menuOpen } } = state;
  const { user } = state.auth;

  const obj = {
    authenticated,
    modalOpen,
    menuOpen,
    imageUrl: user ? user.imageUrl : '',
    name: user ? user.name : '',
  };

  if (user) {
    obj.roles = user.roles || '';
    obj.imageUrl = user.imageUrl || '';
    obj.name = user.name || '';
  }

  return obj;
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(Header);
