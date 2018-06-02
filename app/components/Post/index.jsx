import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import PostPositioner from './PostPositioner';
import PostForm from './PostForm';
import config from './config';
import connect from './connect';

import {
    onPostToggle,
    onPostReferenced,
    emitThreadMove,
    emitSettingsToggle
} from '~/events'
import { isDefined, isFunction } from '~/utils/types'

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

        if (isDefined(override)) {
            if (override === this.state.isOpen) {
                console.warn("Post override rejected; is in desired state");
                return
            }
        }

        if (this.state.isOpen) {
            this.preparePostForClose(...arguments)
        } else {
            emitSettingsToggle(false); // close drawer
            this.preparePostForOpen(...arguments)
        }
    }

    // @onPostReferenced
    onPostReferenced( postId ) {
        this.form.appendToComment(
            `<span class="quotelink">

            </span>`
        )
    }

    render() {
        const { centered, context, isOpen } = this.state;

        console.log(`Post.render(): centered: ${centered}, context: ${context}`)

        if (!isOpen) {
            return null
        }

        const header = this.getContextSpecificHeader(context)

        return (
            <PostPositioner centered={centered} onClick={this.preparePostForClose}>
                {centered && <div>
                    OVERLAY
                </div>}
                <div className="Post" ref={ref => this._post = ref} onClick={e => e.stopPropagation()}>
                    <PostForm
                        theme="black"
                        className="PostForm"
                        header={header}
                        close={this.preparePostForClose}
                        ref={ref => this.form = ref}
                        onSubmit={this.handlePostSubmission}
                    />
                </div>
            </PostPositioner>
        );
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

    preparePostForClose = () => {
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
            this.animateOut(() => {
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

    handlePostSubmission = (post) => {
        console.log("Post.handlePostSubmission()")

        const validationErrors = this.validatePost(post)

        if (validationErrors) {
            return this.invalidateForm(validationErrors);
        }

        const { context } = this.state;

        if (context === "thread") {
            this.props.submitThreadPost(post)
        } else if (context === "board") {
            this.props.submitBoardPost(post)
        } else {
            throw new Error("InvalidContext: Post context was not 'thread' or 'board'")
        }
    }

    validatePost() {
        // Needs access to the max chars and timeout

        // for now
        return
    }

    invalidateForm(errorList) {
        // For now
        return

        this.setState({ showInvalidationMessage: true });

        setTimeout(() =>
            this.setState({
                 showInvalidationMessage: false
            }),
        config.invalidationMessageDuration)

    }

    getContextSpecificHeader(context) {
        if (context === "thread") {
            return <h4>Reply to thread</h4>
        } else {
            return <h4>Create thread</h4>
        }
    }

    animateIn = (callback) => {
        this.animate({
            scale: [1, 0.8],
            opacity: [1, 0]
        }, {
            duration: 300,
            easing: [0.23, 1, 0.32, 1],
            complete: () => {
                isFunction(callback) && callback()
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
                isFunction(callback) && callback()
                this.isDisabled = false
            }
        })
    }

    animate(styles, options) {
        this._post && $(this._post).stop().velocity(styles, options);
    }
}

export default connect(Post);
