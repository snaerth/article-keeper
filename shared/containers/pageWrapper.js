import React from 'react';

export default function (Component) {
  class PageWrapper extends Component {
    render() {
      return (
        <div className="page">
          <Component {...this.props} />
        </div>
      );
    }
  }

  return PageWrapper;
}
