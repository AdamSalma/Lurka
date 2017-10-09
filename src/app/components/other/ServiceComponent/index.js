import React, { Component } from 'react';

/**
 * This is mainly for service type components that do not display anything and
 * function through custom events. (They need to be rendered via react for the
 * events to work properly)
 */
class ServiceComponent extends Component {
    render() { return null }
    shouldComponentUpdate() { return false }
}

export default ServiceComponent;
