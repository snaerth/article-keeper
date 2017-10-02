import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'styles/fonts.scss';
import 'react-virtualized/styles.css'; // only needs to be imported once
import 'react-dates/lib/css/_datepicker.css';
import 'react-infinite-calendar/styles.css';
import s from './appLayout.scss';

export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return <div className={s.layout}>{this.props.children}</div>;
  }
}
