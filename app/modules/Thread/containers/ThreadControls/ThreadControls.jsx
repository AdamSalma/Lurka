import './ThreadControls.styles'
import React, { Component } from "react";

import classes from 'classnames';
import uuid from "uuid";

import {
    WatchController,
    BookmarkController,
    CommentController,
    UpdateController
} from '../../components'


export class ThreadControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.startVisible,
            hide: !props.startVisible
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    show() { this.setState({ isVisible: true }) }

    hide() { this.setState({ isVisible: false }) }

    render() {
        const { isVisible } = this.state;

        const controlClasses = classes('thread-controls', {
            "animate-in": isVisible,
            "animate-out": !isVisible
        })

        return (
            <div className={controlClasses}>
                <div className="controls left-controls">
                    {this.props.leftSide}
                    {/*<BookmarkController {...this.props}/>
                    <WatchController {...this.props}/>*/}
                </div>
                <div className="controls right-controls">
                    {this.props.rightSide}
                    {/*<CommentController {...this.props}/>
                    <UpdateController {...this.props}/>*/}

                    {/*<ButtonCircle toggleProps={{name:"download"}}>
                        <Icon name="download" />
                    </ButtonCircle>*/}

                    {/*<ButtonCircle toggleProps={{name:"close"}}>
                        <Icon name="close" />
                    </ButtonCircle>*/}
                </div>
            </div>
        )
    }
}

export default ThreadControls
