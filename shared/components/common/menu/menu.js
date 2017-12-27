import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import anime from 'animejs';
// Svg
import Dashboard from '../../../assets/images/dashboard.svg';
import Person from '../../../assets/images/person.svg';
import Power from '../../../assets/images/power.svg';
import Users from '../../../assets/images/users.svg';
import Logs from '../../../assets/images/logs.svg';
// Styles
import s from './menu.scss';

class Menu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.animateNavLinks();
  }

  animateNavLinks() {
    const tl = anime.timeline();
    tl
      .add({
        targets: this.ul.children,
        translateY: '100%',
        opacity: {
          value: 0,
          duration: 0,
        },
      })
      .add({
        targets: this.ul.children,
        translateY: '0%',
        opacity: {
          value: 1,
          duration: 1000,
        },
        delay(el, i) {
          return i * 50;
        },
        easing: 'easeOutExpo',
      });
  }

  render() {
    const { open, admin } = this.props;

    return (
      <div className={classnames(s.container, open ? s.open : '')}>
        <div className={s.dropdown}>
          <ul ref={(c) => (this.ul = c)}>
            <li>
              <NavLink to="/" exact activeClassName={s.active}>
                <Dashboard />Dashboard
              </NavLink>
            </li>
            {admin
              ? [
                <li key="profile">
                  <NavLink to="/profile" activeClassName={s.active}>
                    <Person />Profile
                  </NavLink>
                </li>,
                <li key="users">
                  <NavLink to="/users" activeClassName={s.active}>
                    <Users />Users
                  </NavLink>
                </li>,
                <li key="logs">
                  <NavLink to="/logs" activeClassName={s.active}>
                    <Logs />Logs
                  </NavLink>
                </li>,
                ]
              : null}
            <li>
              <NavLink to="/signout">
                <Power />Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @param {Object} ownProps - Components own props
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { user } = state.auth;

  return {
    admin: user.roles.includes('superuser') || user.roles.includes('admin') || false,
  };
}

export default connect(mapStateToProps)(Menu);
