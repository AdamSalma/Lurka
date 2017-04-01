import React, { Component } from "react";

import classes from 'classnames';
import uuid from "uuid";

import { Icon, ButtonCircle } from '~/components'

import {
    WatchController, 
    ArchiveController, 
    CommentController, 
    UpdateController
} from './controllers'


export default class ThreadControls extends Component {
    render() {
        const {thread:{ isActive, posts }} = this.props;

        const controlClasses = classes('thread-controls', {
            "animate-in": isActive && posts.length,
            "animate-out": !isActive
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
