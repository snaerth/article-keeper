import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Banner from '../../components/common/banner';

export default class NotFound extends Component {
  static propTypes = {
    staticContext: PropTypes.shape({
      status: PropTypes.number,
    }),
  };

  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Profile" />
        <Banner text="404 Page was not found" />
      </div>
    );
  }
}
