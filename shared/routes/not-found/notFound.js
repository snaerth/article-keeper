import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import s from './notFound.scss';

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
        <section className={s.container}>
          <div className={s.center}>
            <h1>404</h1>
            <p>The page you were looking for was not found.</p>
            <Link to="/">Go back to Dashboard</Link>
          </div>
        </section>
      </div>
    );
  }
}
