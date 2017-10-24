import React, { Component } from 'react';

const AnimatedWrapper = (WrappedComponent) =>
  class AnimatedWrapper extends Component {
    componentWillAppear(cb) {
      console.log(1);
      cb();
    }
    componentWillEnter(cb) {
      console.log(2);
      cb();
    }
    componentWillLeave(cb) {
      console.log(3);
      setTimeout(() => cb(), 175);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
export default AnimatedWrapper;
