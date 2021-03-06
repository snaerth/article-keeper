import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import shortid from 'shortid';
import s from './dropdownMenu.scss';

class DropdownMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool.isRequired,
    callbackCloseFn: PropTypes.func.isRequired,
    excludeId: PropTypes.string.isRequired,
  };

  handleClickOutside = (e) => {
    e.preventDefault();
    const { excludeId, visible, callbackCloseFn } = this.props;
    const targetId = e.target.id;
    if (excludeId !== targetId && visible) {
      callbackCloseFn(false);
    }
  };

  render() {
    const { children, visible } = this.props;

    return (
      <div className={classnames(s.dropdown, visible ? s.active : '')}>
        <ul>{children.map((item) => <li key={shortid.generate()}>{item}</li>)}</ul>
      </div>
    );
  }
}

export default onClickOutside(DropdownMenu);
