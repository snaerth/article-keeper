import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Container from '../../components/container';

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
      <Container className="mt25">
        <Helmet title="404 Not Found" />
        <h1>Page was not found</h1>
      </Container>
    );
  }
}
