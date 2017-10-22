import React, { Component } from 'react';

/**
 * ServiceComponent
 *
 * Classes that inherit from this do not render anything and do not update.
 * Instead they communicate on a "global" namespace using events.
 *
 * The events will trigger this service, like display an alert or toggle the
 * theme or analytics etc.
 */
class ServiceComponent extends Component {
    render() { return null }
    shouldComponentUpdate() { return false }
}

export default ServiceComponent;
