import React, { Component } from "react";

import classNames from 'classnames';
import uuid from "uuid";

import Icon from "../Icon";


export default class Thread extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate({thread:{ isActive }}, nextState) {
        const {thread:{isActive: wasActive }} = this.props

        // Thread status changed?
        if (wasActive !== isActive) {
            isActive ? this.showControls() : this.hideControls()
        }
    }

    render() {
        return (
            <div className="thread-controls">
                <div className="left-controls">

                    {/* Toggle icon
                        <Icon name="eye" /> 
                        eye off
                    */}
                    <Icon name="eye" /> 

                    <Icon name="update" />
                </div>
                <div className="right-controls">

                    <Icon name="download" /> 
                    {/*Save to archive
                        <Icon name="delete" /> 
                        bin icon -> to remove from archive

                       OR use this instead of 'download':
                        <Icon name="library-plus" /> 

                       OR this. looks the best imo:
                        <Icon name="package-down" />   
                    */}
                   
                    <Icon name="comment-text" />
                    {/* OR
                        right facing:
                        <Icon name="message" />
                        <Icon name="message-text" />
                        
                        left facing:
                        <Icon name="message-reply-text" />  
                        <Icon name="message-reply-text" />
                        <Icon name="reply" />  addow facing left

                    */}

                    <Icon name="close" />
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
