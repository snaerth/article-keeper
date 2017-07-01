import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import AppLayout from './app-layout';
import Header from './common/header';

const App = ({ children, name }) => (
  <AppLayout>
    <Header name={name} />
    <CSSTransitionGroup
      transitionName="fadeIn"
      transitionLeave={false}
      transitionEnterTimeout={700}
    >
      {React.cloneElement(children, { key: name })}
    </CSSTransitionGroup>
  </AppLayout>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const routes = ownProps.children.props.children;
  const pathName = state.routing.location.pathname;

  // Filter route by current location path
  const filteredRoute = routes.filter((route) => {
    let name = '';

    if (route && route.props.path === pathName) {
      name = route.props.name;
    }

    return name;
  });

  return { ...state, name: filteredRoute[0].props.name };
}

export default connect(mapStateToProps)(App);
