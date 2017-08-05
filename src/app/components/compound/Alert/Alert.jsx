import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Alert from 'react-alert'

class AlertWrapper extends PureComponent {
    static propTypes = {
        position: PropTypes.string,
    };

    static defaultProps = {
        position: 'bottom right'
    }

    constructor(props) {
        super(props);
        this.showAlert = this.showAlert.bind(this)
    }

    shouldComponentUpdate({ alertMessage }) {
        if (this.props.alertMessage !== alertMessage ) {
            this.showAlert(alertMessage)
        }
        return false
    }

    render() {
        return (
            <Alert
                ref={el => this._msg = el}
                position={this.props.position}
                offset={this.props.offset}
                theme={this.props.theme}
                transition={this.props.transition}
            />
        );
    }

    showAlert({message, type='info', time=4000, icon=false}) {
        if (type === 'info') {
            icon = <img src="alert-info.png"/>
        }

        this._msg.show(message, {time, type, icon})
    }
}

export default connect(
    ({status}) => ({
        alertMessage: status.alertMessage
    }))
(AlertWrapper)

