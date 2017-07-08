import './WatchPanel.styles'
import React, {PureComponent} from 'react'
import cx from 'classnames'

import Panel from '../../components/Panel'
import {
    Timer,
    TimeAgo,
    Icon,
    Line,
    Scrollable
} from '~/components'


export default class WatchPanel extends PureComponent {
    constructor(props) {
        super(props);
        this.renderWatchItem = this.renderWatchItem.bind(this)
        this.handleUpdate  = this.handleUpdate.bind(this)
        this.handleUnwatch = this.handleUnwatch.bind(this)
        this.handleClick   = this.handleClick.bind(this)
    }

    render() {
        const {isDrawerOpen, isActive, watch: {newPosts, threads}} = this.props

        const watchClass = cx('WatchPanel', {
            'show-description': !threads && !threads.length,
        })

        return <Panel isActive={isActive} className={watchClass} isDrawerOpen={isDrawerOpen}>
            <div className="watch-title"><h4>Watch List</h4></div>
            <div className="description">
                Threads that are being watched will appear here.
                To add a thread, click on the watch button in an open thread.
            </div>
            <Scrollable className="tilt-container">
                {this.renderMonitoredThreads(threads)}
            </Scrollable>
        </Panel>
    }

    renderMonitoredThreads(threads) {

        const uniqueBoards = threads
            .map( thread => thread.boardID )
            .filter((value, index, self) => self.indexOf(value) === index)

        return uniqueBoards.map( uniqueBoard => {
            return (
                <div className="watch-group" key={uniqueBoard}>
                    <div className="board-header">
                        <span>{`/${uniqueBoard}/`}</span>
                    </div>
                    {threads
                        .filter(thread => thread.boardID === uniqueBoard)
                        .map(this.renderWatchItem)
                    }
                </div>
            )
        })
    }

    renderWatchItem(thread) {
        return <WatchItem
            key={thread.threadID}
            updateInterval={this.props.settings.threadUpdateInterval}
            thread={thread}
            onUpdate={this.handleUpdate.bind(null, thread)}
            onUnwatch={this.handleUnwatch.bind(null, thread.threadID)}
            onClick={this.handleClick.bind(null, thread)}
        />
    }

    handleUpdate(thread, event) {
        console.log("handleUpdate");
        if (event) {
            event.stopPropagation()
        }
        this.props.updateMonitoredThread(thread)
    }

    handleUnwatch(threadID, event) {
        console.log("handleUnwatch");
        if (event) {
            event.stopPropagation()
        }
        this.props.unmonitorThread(threadID)
    }

    handleClick({boardID, threadID}) {
        console.log('Fetching thread');
        const {fetchThread, closeThread, status} = this.props
        closeThread(() => fetchThread(boardID, threadID))
    }
}



const WatchItem = props => {
    const {
        updateInterval, onUpdate, onUnwatch, onClick,
        thread: {
            newPosts=0,
            threadID,
            boardID,
            totalPosts,
            didInvalidate,
            isFetching,
            lastReplyAt,
            op: { title, media, comment, time }
        }
    } = props;

    const postClasses = cx("new-posts", {
        "has-new": newPosts > 0  // TODO: && state.watchedOpenedFor5Secs || hovered
    })

    const postText = newPosts>0 ? newPosts : "No new posts"

    return (
        <div className="watch-item tilter" onClick={onClick}>
            <div className="watch-content">

            {/* Content */}
                <div className="thumbnail">
                    <img src={media.thumbnail} />
                </div>
                <div className="watch-post">
                    <span
                        className="text"
                        dangerouslySetInnerHTML={{
                            __html: title ? title : comment
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
                                Total: {totalPosts}
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
