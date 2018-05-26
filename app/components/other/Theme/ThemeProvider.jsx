import React, { Component, Children } from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  static childContextTypes = {
    theme: PropTypes.object.isRequired
  }

  getChildContext() {
    return { theme: this.props.theme }
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default connect(state => ({
  theme: state.settings.theme
}))(ThemeProvider);
