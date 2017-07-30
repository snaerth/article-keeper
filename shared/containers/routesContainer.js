import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Components
import Header from '../components/header';

const RouteContainer = ({ children, name }) => (
  <div>
    <Header name={name} />
    {React.cloneElement(children, { key: name })}
  </div>
);

RouteContainer.propTypes = {
  children: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const routes = ownProps.children.props.children;
  const pathName = ownProps.history.location.pathname;

  // Filter route by current location path
  const filteredRoute = routes.filter((route) => {
    let name = '';

    if (route && route.props.path === pathName) {
      name = route.props.name;
    }

    return name;
  });

  const name = filteredRoute && filteredRoute[0]
    ? filteredRoute[0].props.name
    : '404';

  return { ...state, name };
}

export default withRouter(connect(mapStateToProps)(RouteContainer));
