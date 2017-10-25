import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import MediumEditor from '../../components/mediumEditor/editor';

class Dashboard extends PureComponent {
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
