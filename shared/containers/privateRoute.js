import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends PureComponent {
  renderHandler(props) {
    const { component, authenticated } = this.props;

    if (authenticated) {
      return React.createElement(component, props);
    }

    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />
    );
  }

  render() {
    const { exact = false, path } = this.props;

    return <Route exact={exact} path={path} render={(props) => this.renderHandler(props)} />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
