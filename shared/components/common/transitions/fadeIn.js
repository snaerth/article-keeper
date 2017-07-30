import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

const FadeIn = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{
      enter: 700,
      exit: 100,
    }}
    classNames="fadeIn"
  >
    {children}
  </CSSTransition>
);

FadeIn.propTypes = {
  children: PropTypes.object.isRequired,
};

export default FadeIn;
