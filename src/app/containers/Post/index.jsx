import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import PostPositioner from './PostPositioner';
import config from './config';

import {
    onPostToggle,
    emitThreadMove,
} from '~/events'
import utils from '~/utils'



export class Post extends Component {
    static defaultProps = {
        context: "thread"
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen || false,
            context: null,
            centered: true
        }
    }

    @onPostToggle
    onPostToggle ({ override }) {
        if (this.isDisabled) {
            console.warn("Post toggle rejected; is animating")
            return
        }

        if (utils.types.isDefined(override)) {
            if (override === this.state.isOpen) {
                console.warn("Post override rejected; is in desired state");
                return
            }
        }

        if (this.state.isOpen) {
            this.preparePostForClose(...arguments)
        } else {
            this.preparePostForOpen(...arguments)
        }
    }

    preparePostForOpen({ context }) {
        this.isDisabled = true
        let centered = true

        if (this.shouldRenderToSide(context)) {
            console.warn("Rendering as dual")
            centered = false
        }
        // else post is centered on top of thread with overlay

        this.setState({
            isOpen: true,
            centered: centered,
            context: context
        });

        if (!centered) {
            emitThreadMove({
                position: "right",
                callback: this.animateIn
            });
        } else {
            this.animateIn()
        }

    }

    preparePostForClose() {
        this.isDisabled = true
        const {centered, context} = this.state;

        const futureState = {
            isOpen: false,
            centered: null,
            context: null
        }

        if (!centered && context === "thread") {
            this.animateOut(() => {
                emitThreadMove({
                    position: "center",
                    callback: () => {
                        this.setState(futureState);
                    }
                })
            })
        } else {
            this.animateOut( () => {
                this.setState(futureState);
            })
        }
    }

    shouldRenderToSide(context) {
        if (!context) {
            throw new Error("No context provided onPostToggle event")
        }

        if (context !== "thread") {
            console.log(`Context was not 'thread' (Was: ${context})`)
            return false
        }

        if (window.innerWidth > config.postOverlayBreakpoint) {
            return false
        }

        return true
    }

    render() {
        const { centered, context, isOpen } = this.state;

        console.log(`Post.render(): centered: ${centered}, context: ${context}`)

        if (!isOpen) {
            return null
        }

        return (
            <PostPositioner centered={centered}>
                {centered && <div>
                    OVERLAY
                </div>}
                <div className="Post" ref={ref => this._post = ref}>
                    {context === "thread" && <div>IN THREAD. </div>}
                    POST!!!
                </div>
            </PostPositioner>
        );
    }

    animateIn = (callback) => {
        this.animate({
            scale: [1, 0.8],
            opacity: [1, 0]
        }, {
            duration: 300,
            easing: [0.23, 1, 0.32, 1],
            complete: () => {
                utils.types.isFunction(callback) && callback()
                this.isDisabled = false
            }
        })
    }

    animateOut = (callback) => {
        this.animate({
            scale: [0.8, 1],
            opacity: [0, 1]
        }, {
            duration: 200,
            easing: [0.23, 1, 0.32, 1],
            complete: () => {
                utils.types.isFunction(callback) && callback()
                this.isDisabled = false
            }
        })
    }

    animate(styles, options) {
        this._post && $(this._post).velocity(styles, options);
    }
}

export default Post;
