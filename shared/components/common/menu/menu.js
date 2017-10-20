import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import s from './menu.scss';

class Menu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  };

  render() {
    const { open } = this.props;

    return <div className={open ? s.open : ''}>Menu</div>;
  }
}

export default Menu;
