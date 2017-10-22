import React from 'react';
import PropTypes from 'prop-types';

const injectTheme = (Component) => {
  return class ComponentWithTheme extends React.Component {

    static contextTypes = {
      theme: PropTypes.object.isRequired
    }

    render() {
      return <Component
        {...this.props}
        theme={this.context.theme}
      />
    }
  }
}

export default injectTheme;
