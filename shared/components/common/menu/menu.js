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
              <Link to="/">
                <Dashboard />Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <Users />Profile
              </Link>
            </li>
            <li>
              <Link to="/users">
                <Users />Users
              </Link>
            </li>
            <li>
              <Link to="/logs">
                <Logs />Logs
              </Link>
            </li>
            <li>
              <Link to="/signout">
                <Power />Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
