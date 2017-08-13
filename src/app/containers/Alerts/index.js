import React, { PureComponent } from 'react';
import Alert from 'react-alert'
import connect from './connect'
import config from './config'

import {AlertInfo} from './AlertIcons'
import './styles'


export class Alerts extends PureComponent {
    shouldComponentUpdate({ alertMessage }) {
        if (this.isNewMessage(alertMessage)) {
            this.showAlert(alertMessage.message, alertMessage)
        }

        // Always return false because there is no need to rerender at this
        // level of the tree; The sub-component handles renders by itself
        return false
    }

    isNewMessage(message) {
        return this.props.alertMessage !== message
    }

    showAlert (message, {type, time, icon}=config) {
        if (type === 'info') {
            icon = <AlertInfo/>
        }

        this._msg.show(<div>{message}</div>)
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

}

export default connect(Alerts)

