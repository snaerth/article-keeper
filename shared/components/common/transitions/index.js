import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Transition = props => (
  <CSSTransition {...props} mountOnEnter unmountOnExit />
);

Transition.propTypes = {
  classNames: PropTypes.string.isRequired,
  timeout: PropTypes.object.isRequired,
};

export default Transition;
