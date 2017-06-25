import './ThreadControls.styles'
import React, { Component } from "react";

import classes from 'classnames';
import uuid from "uuid";

import {
    WatchController,
    ArchiveController,
    CommentController,
    UpdateController
} from '../../components'


export default class ThreadControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hide: true
        }
    }

    show() {
        this.setState({ show: true, hide: false });
    }

    hide() {
        this.setState({ show: false, hide: true });
    }

    render() {
        const { show, hide } = this.state;

        const controlClasses = classes('thread-controls', {
            "animate-in": show,
            "animate-out": hide
        })

        return (
            <div className={controlClasses}>
                <div className="controls left-controls">

                    <ArchiveController {...this.props}/>
                    <WatchController {...this.props}/>

                </div>
                <div className="controls right-controls">

                    <CommentController {...this.props}/>
                    <UpdateController {...this.props}/>

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

/*
    TODO: when making reply box section: use this to send:
    <Icon name="publish" />
    OR
    <Icon name="telegram" />
 */
