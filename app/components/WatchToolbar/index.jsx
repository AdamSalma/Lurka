import React, { Component } from "react";
import cx from 'classnames';
import connect from './connect';

/* Components */
import {
    Image,
    TimeAgo,
    Icon,
    Scrollable,
    Button,
    Notification
} from '~/components/UI';


/* Events */
import { emitThreadOpen, emitThreadClose } from "~/events";

/* Utilities */
// import utils from '~/utils';
// import { throttleByCount } from '~/utils/throttle';

/* Animation settings */
// import {
//     animationOptions,
//     animationStyles,
//     scrollConfig
// } from './config'

import './styles'
import { setHTML } from '~/utils/react';


const i = Lurka.icons;


export class WatchToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: props.threads || [],
            isExpanded: props.startExpanded || false
        }
    }

    render() {
        const { isExpanded } = this.state;
        return <div className={cx("WatchToolbar", isExpanded ? "is-expanded" : "is-shrunk")}>
            {this.createWatchPosts(this.props, isExpanded)}
            {!isExpanded && <div className="add-icon circle"><Icon name="plus"/></div>}
            { isExpanded && <div className="utils">
                <Button>Add</Button>
                <Button>Remove</Button>
            </div>}
            {!isExpanded && <Icon className="open-icon circle" name="chevron-left" />}
          </div>;
    }

    createWatchPosts(props, isExpanded) {
        const { threads, metadata, fetchThread } = props;
        console.log(props);
        return threads.map(({ id }) => {
            const meta = metadata[id]

            return <Notification key={id} className="thread" onClick={() => this.onClick(id)}>
                <div className="shrunk-image circle" style={{ backgroundImage: `url(${meta.op.media.thumbnail})` }} />

                {isExpanded && <div className="comment-block">
                    <div className="title" {...setHTML(meta.op.title ? meta.op.title : meta.op.comment)} />
                    <div className="latest-reply">
                        {meta.lastReplyAt}
                    </div>
                </div>}
            </Notification>
        })
    }

    onClick = (threadId) => {
        const _id = threadId.split("/");
        emitThreadClose();
        this.props.fetchThread({
            boardID: _id[0],
            threadID: _id[1],
            callback: emitThreadOpen,
            noCache: true
        });
    }
}

export default connect(WatchToolbar);
