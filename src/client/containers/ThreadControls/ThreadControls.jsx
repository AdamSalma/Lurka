import React, { Component } from "react";

import classNames from 'classnames';
import uuid from "uuid";

import Icon from "../../components/Icon";
import Wrapper from './ControlWrapper'


export default class Thread extends Component {
    constructor(props) {
        super(props);
        this.subprops = {

        }
    }

    render() {
        const {thread:{isActive, posts}} = this.props;
        const controlClasses = classNames('thread-controls', {
            "animate-in": isActive && posts.length,
            "animate-out": !isActive
        })

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
                    <Wrapper toggleProps={{name:"package-down"}}>
                        <Icon name="package-down" /> 
                    </Wrapper>


                    {/* Toggle icon
                        <Icon name="eye" /> 
                        eye off
                    */}
                    <Wrapper toggleProps={{name:"eye-off"}}>
                        <Icon name="eye" /> 
                    </Wrapper>
                </div>
                <div className="controls right-controls">

                    {/*<Wrapper toggleProps={{name:"download"}}>
                        <Icon name="download" /> 
                    </Wrapper>*/}

                    
                    {/* OR
                        right facing:
                        <Icon name="message" />
                        <Icon name="message-text" />
                        
                        left facing:
                        <Icon name="message-reply-text" />  
                        <Icon name="message-reply-text" />
                        <Icon name="reply" />  addow facing left

                    */}
                    <Wrapper toggleProps={{name:"comment-text"}}>
                        <Icon name="comment-text"/>
                    </Wrapper>

                    <Wrapper toggleProps={{name:"update"}}>
                        <Icon name="update" />
                    </Wrapper>

                    {/*<Wrapper toggleProps={{name:"close"}}>
                        <Icon name="close" />
                    </Wrapper>*/}
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
