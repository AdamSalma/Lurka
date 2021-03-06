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

    showAlert (message, options) {
        options = Object.assign({}, config, options);
        options.icon = this.getIcon(options.type);

        this._msg.show(message, options)
    }

    getIcon( type ) {
        switch (type){
            case 'info':
                return <AlertInfo/>
            case 'warning':
                return 'info'
        }
    }

    render() {
        return (
            <Alert
                className="Alerts"
                ref={el => this._msg = el}
                position={this.props.position}
                offset={this.props.offset}
                theme={this.props.theme}
                transition={this.props.transition}
            />
        );
    }

}

Alerts.defaultProps = {
    position: "bottom left"
}

export default connect(Alerts)

