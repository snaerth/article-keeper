import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Helmet title="Dashboard" />
        Dashboard
      </div>
    );
  }
}

export default Dashboard;
