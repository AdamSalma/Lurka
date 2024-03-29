import React from 'react';
import cx from 'classnames';

import {
    TimeAgoShort,
    Icon
} from '~/components'
import utils from '~/utils'

const i = Lurka.icons

const WatchEntity = props => {
    const {
        updateInterval, onUpdate, onUnwatch, onClick,
        metadata: {
            didInvalidate,
            isFetching,
            lastReplyAt,
            newPosts=0,
            postsCount,
            op
        },
        entity: {id}
    } = props;

    const postClasses = cx("new-posts", {
        "has-new": newPosts > 0  // TODO: && state.watchedOpenedFor5Secs || hovered
    })

    const postText = newPosts > 0 ? newPosts : "No new posts"

    return (
        <div className="watch-item tilter" onClick={onClick}>
            <div className="watch-content">

            {/* Content */}
                <div className="thumbnail">
                    <img src={op.media.thumbnail} />
                </div>
                <div className="watch-post">
                    <span className="text"
                        {...utils.react.setHTML(op.title ? op.title : op.comment)}
                    />

                    {/* Watch Stats */}
                    { isFetching ?
                        <div className="watch-stats"><div className="updating">Updating</div></div>
                        : (<div className="watch-stats">
                            {id}
                            <div className={postClasses}>
                                {postText}
                            </div>
                            <div className="total-posts">
                                Total: {postsCount}
                            </div>
                            <div className="timeago">
                                <TimeAgoShort time={lastReplyAt}/>
                            </div>
                        </div>)
                    }
                </div>


            </div>
            <div className="watch-controls">
                <div className="watch-close" onClick={onUnwatch}>
                    <Icon name={i.watchPanelClose}/>
                </div>
                <div className="watch-update" onClick={onUpdate}>
                    <Icon name={i.watchPanelUpdate}/>
                </div>
            </div>

        </div>
    )
}

export default WatchEntity
