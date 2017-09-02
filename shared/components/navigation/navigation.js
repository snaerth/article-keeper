import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './navigation.scss';

export default class Navigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  /**
   * Renders each navigation item
   * @param {*} component
   * @param {Int} index
   * @param {Object} styles
   * @returns {Jsx}
   */
  renderItem(component, index, { item, link, left, className }) {
    return (
      <li className={classnames(item, index === 0 && !className ? left : '')}>
        {React.cloneElement(component, {
          className: link,
        })}
      </li>
    );
  }

  render() {
    const { nav, list, item, link, left } = s;
    const { className } = this.props;
    return (
      <nav className={classnames(nav, className ? s[className] : '')}>
        <ul className={list}>
          {React.Children.map(this.props.children, (component, index) =>
            this.renderItem(component, index, { item, link, left, className }),
          )}
        </ul>
      </nav>
    );
  }
}
