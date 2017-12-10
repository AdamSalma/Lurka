import React, {Component} from 'react'
import deepForceUpdate from 'react-deep-force-update'
import App from './App'

module.hot.accept("../../", function() {
    // replace request handler of server
    alert("Hot module accepting");
});

class HotLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidMount() {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
      console.error(
        'React Hot Loader: It appears that "react-hot-loader/patch" ' +
        'did not run immediately before the app started. Make sure that it ' +
        'runs before any other code. For example, if you use Webpack, ' +
        'you can add "react-hot-loader/patch" as the very first item to the ' +
        '"entry" array in its config. Alternatively, you can add ' +
        'require("react-hot-loader/patch") as the very first line ' +
        'in the application code, before any other imports.'
      );
    }
  }

  componentWillReceiveProps() {
    // Hot reload is happening.
    // Retry rendering!
    this.setState({
      error: null,
    });

    // Force-update the whole tree, including
    // components that refuse to update.
    deepForceUpdate(this);
  }

  // This hook is going to become official in React 15.x.
  // In 15.0, it only catches errors on initial mount.
  // Later it will work for updates as well:
  // https://github.com/facebook/react/pull/6020
  unstable_handleError(error) { // eslint-disable-line camelcase
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return this.props.errorReporter ?
        <this.props.errorReporter error={error} /> : error;
    }

    console.log("<App/>")
    return <App />
  }
}

export default HotLoader;
