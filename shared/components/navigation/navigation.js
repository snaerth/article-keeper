import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import s from './navigation.scss';

export default class Navigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { nav, list, item, link, left } = s;
    const { className, children } = this.props;

    return (
      <nav className={classnames(nav, className ? s[className] : '')}>
        <ul className={list}>
          {React.Children.map(children, (component, index) => {
            if (component.type === 'div') {
              return component;
            }

            return (
              <li
                className={classnames(
                  item,
                  index === 0 && !className ? left : '',
                )}
              >
                {React.cloneElement(component, {
                  className: link,
                })}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
