import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
// Svg
import Dashboard from '../../../assets/images/dashboard.svg';
import Power from '../../../assets/images/power.svg';
import Users from '../../../assets/images/users.svg';
import Logs from '../../../assets/images/logs.svg';
// Styles
import s from './menu.scss';

class Menu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  render() {
    const { open } = this.props;

    return (
      <div className={classnames(s.container, open ? s.open : '')}>
        <div className={s.dropdown}>
          <ul>
            <li>
              <Dashboard />
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Users />
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Users />
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Logs />
              <Link to="/logs">Logs</Link>
            </li>
            <li>
              <Power />
              <Link to="/signout">Sign out</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
