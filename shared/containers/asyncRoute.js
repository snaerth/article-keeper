import React, { Component } from 'react';

const moduleDefaultExport = module => module.default || module;

export default function asyncRoute(getComponent) {
  return class AsyncRoute extends Component {
    static Component = null;

    state = {
      Component: AsyncRoute.Component,
    };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(moduleDefaultExport).then((c) => {
          AsyncRoute.Component = c;

          if (this.mounted) {
            this.setState({ Component: c });
          } else {
            this.state.Component = c;
          }
        });
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    render() {
      /* eslint-disable no-shadow */
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };
}
