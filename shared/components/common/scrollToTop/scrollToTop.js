import React, { PureComponent } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

class ScrollToTop extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.node,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
