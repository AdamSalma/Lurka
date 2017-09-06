import React from 'react';
import cx from 'classnames';
import { Icon } from '~/components';
import './styles';

const i = window.appSettings.icons;

class ToTopButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: !props.startHidden
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    render () {
        const classes = cx('ToTopButton', this.props.className, {
            'is-visible': this.state.isVisible
        });
        console.log("ToTopButton render()", this.state.isVisible)

        return (
            <div className={classes} onClick={this.props.onClick}>
                <Icon name={i.boardToTopChevron}/>
                <div className="text">To Top</div>
            </div>
        );
    };

    show() {
        logger.method('ToTopButton show')
        !this.state.isVisible && this.setState({isVisible: true});
    }

    hide() {
        logger.method('ToTopButton hide')
        this.state.isVisible && this.setState({isVisible: false});
    }
}

ToTopButton.displayName = 'ToTopButton';

export default ToTopButton;
