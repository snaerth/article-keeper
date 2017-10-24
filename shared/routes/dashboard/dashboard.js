import React, { Component } from 'react';
import Helmet from 'react-helmet';
import MediumEditor from '../../components/mediumEditor/editor';

class Dashboard extends Component {
  componentWillAppear(cb) {
    console.log(1);
    cb();
  }
  componentWillEnter(cb) {
    console.log(2);
    cb();
  }
  componentWillLeave(cb) {
    console.log(3);
    setTimeout(() => cb(), 175);
  }
  render() {
    return (
      <div>
        <Helmet title="Dashboard" />
        <MediumEditor />
      </div>
    );
  }
}

export default Dashboard;
