import React, { Component } from "react";

import classNames from 'classnames';
import uuid from "uuid";

import { Icon, ButtonCircle } from '../../components'


export default class ThreadControls extends Component {
    constructor(props) {
        super(props);
        this.subprops = {

        }
    }

    render() {
        const {
            thread:{isActive, posts, requestedAt, didInvalidate}, 
            status: {threadID, boardID},
            unmonitorThread,
            monitorThread 
        } = this.props;

        const controlClasses = classNames('thread-controls', {
            "animate-in": isActive && posts.length,
            "animate-out": !isActive
        })

        const monitorArgs = {
            boardID, 
            threadID,
            requestedAt,
            didInvalidate,
            op: posts && posts[0]
        }

        return (
            <div className={controlClasses}>
                <div className="controls left-controls">
                    
                    {/*Save to archive
                        <Icon name="delete" /> 
                        bin icon -> to remove from archive

                       OR use this instead of 'download':
                        <Icon name="library-plus" /> 

                       OR this. looks the best imo:
                        <Icon name="package-down" />   
                    */}
                    <ButtonCircle toggleProps={{name:"package-down"}}>
                        <Icon name="package-down" /> 
                    </ButtonCircle>


                    {/* Toggle icon
                        <Icon name="eye" /> 
                        eye off
                    */}
                    <ButtonCircle toggleProps={{name:"eye", onClick: unmonitorThread.bind(null, threadID)}}>
                        <Icon name="eye" onClick={monitorThread.bind(null, monitorArgs)}/> 
                    </ButtonCircle>
                </div>
                <div className="controls right-controls">

                    {/*<ButtonCircle toggleProps={{name:"download"}}>
                        <Icon name="download" /> 
                    </ButtonCircle>*/}

                    
                    {/* OR
                        right facing:
                        <Icon name="message" />
                        <Icon name="message-text" />
                        
                        left facing:
                        <Icon name="message-reply-text" />  
                        <Icon name="message-reply-text" />
                        <Icon name="reply" />  addow facing left

                    */}
                    <ButtonCircle toggleProps={{name:"comment-text"}}>
                        <Icon name="comment-text"/>
                    </ButtonCircle>

                    <ButtonCircle toggleProps={{name:"update"}}>
                        <Icon name="update" />
                    </ButtonCircle>

                    {/*<ButtonCircle toggleProps={{name:"close"}}>
                        <Icon name="close" />
                    </ButtonCircle>*/}
                </div>
            </div>
        )
    }

    showControls() {

    }

    hideControls() {

    }
}

/*
    TODO: when making reply box section: use this to send:
    <Icon name="publish" />
    OR
    <Icon name="telegram" />
 */
