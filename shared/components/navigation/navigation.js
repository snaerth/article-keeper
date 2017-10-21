import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Svg
import Menu from '../../assets/images/menu.svg';
import s from './navigation.scss';

export default class Navigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { nav, list, item, link, first } = s;
    const { className, children, onClick } = this.props;

    return (
      <nav className={classnames(nav, className ? s[className] : '')}>
        <ul className={list}>
          <li>
            <Menu className={s.menu} onClick={() => onClick()} />
          </li>
          {React.Children.map(children, (component, index) => {
            if (component.type === 'div') {
              return component;
            }

            return (
              <li className={classnames(item, index === 0 ? first : '')}>
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
