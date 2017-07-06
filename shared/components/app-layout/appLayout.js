import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'styles/fonts.scss';
import s from './appLayout.scss';

export default class AppLayout extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={s.layout}>
        {this.props.children}
      </div>
    );
  }
}
