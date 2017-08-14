import './styles'
import React, {Component} from 'react'
import cx from 'classnames'
import connect from './connect';

import {
    Panel,
    ClassTransition
} from '../../components'
import {
    Timer,
    TimeAgo,
    Icon,
    Line,
    Scrollable
} from '~/components'

const i = window.appSettings.icons


export class WatchPanel extends Component {



    // Used by parent to control UI
    show = (args) => this.transitioner.show(args);
    hide = (args) => this.transitioner.hide(args);
    setTransitionerRef = (ref) => this.transitioner = ref;

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        const { queue } = this.props

        const watchClass = cx('WatchPanel', {
            'show-description': !queue || !queue.length,
        });

        return (
            <ClassTransition effect="fade scale" ref={this.setTransitionerRef} className={watchClass}>
                <div className="watch-title"><h4>Thread Watcher</h4></div>
                <div className="description">
                    Threads that are being watched will appear here.
                    To add a thread, click on the watch button in an open thread or right click on a board post.
                </div>
                <Scrollable className="tilt-container">
                    {this.renderWatchEntityGroups(queue)}
                </Scrollable>
            </ClassTransition>
        );

    }

    renderWatchEntityGroups(queue) {
        const boards = queue
            .map( entity => entity.id.split('/')[0])
            .filter((value, index, self) => self.indexOf(value) === index)

        return boards.map( boardID => {
            return (
                <div className="watch-group" key={boardID}>
                    <div className="board-header">
                        <span>{`/${boardID}/`}</span>
                    </div>
                    {queue
                        .filter(entity => entity.id.split('/')[0] === boardID)
                        .map(this.renderWatchEntity)
                    }
                </div>
            )
        });
    }

    renderWatchEntity = (entity) => {
        console.warn(entity);

        return <WatchItem
            key={entity.id}
            entity={entity}
            metadata={this.props.metadata[entity.id]}
            onUpdate={() => this.handleUpdate(entity)}
            onUnwatch={() => this.handleUnwatch(entity.id)}
            onClick={() => this.handleClick(entity)}
        />
    }

    handleUpdate (thread, event) {
        console.log("handleUpdate");
        if (event) {
            event.stopPropagation()
        }
        this.props.updateMonitoredThread(thread)
    }

    handleUnwatch (threadID, event) {
        console.log("handleUnwatch");
        if (event) {
            event.stopPropagation()
        }
        this.props.unmonitorThread(threadID)
    }

    handleClick ({boardID, threadID}) {
        console.log('Fetching thread');
        const {fetchThread, closeThread, status} = this.props
        closeThread(() => fetchThread(boardID, threadID))
    }
}



const WatchItem = props => {
    const {
        updateInterval, onUpdate, onUnwatch, onClick,
        metadata: {
            didInvalidate,
            isFetching,
            lastReplyAt,
            newPosts=0,
            postsCount,
            op
        }
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
                    <span
                        className="text"
                        dangerouslySetInnerHTML={{
                            __html: op.title ? op.title : op.comment
                        }}
                    />

                    {/* Watch Stats */}
                    { isFetching ?
                        <div className="watch-stats"><div className="updating">Updating</div></div>
                        : (<div className="watch-stats">
                            <div className={postClasses}>
                                {postText}
                            </div>
                            <div className="total-posts">
                                Total: {postsCount}
                            </div>
                            <div className="timeago">
                                <TimeAgo time={lastReplyAt} canToggle={false}/>
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

            <Timer
                displayCounter={false}
                seconds={updateInterval}
                autoreset={true}
                active={!didInvalidate}
                onTimerEnd={onUpdate}
            />
        </div>
    )
}

export default connect(WatchPanel)
