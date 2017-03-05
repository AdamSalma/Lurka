import React, {Component} from 'react'
import classNames from 'classnames'

import {
    HeaderPanel, 
    Timer, 
    TimeAgo,
    Icon,
    Line,
    Scrollable
} from '~/components'


export default class WatchPanel extends Component {
    constructor(props) {
        super(props);
        this.renderWatchItem = this.renderWatchItem.bind(this)
        this.handleUpdate  = this.handleUpdate.bind(this)
        this.handleUnwatch = this.handleUnwatch.bind(this)
        this.handleClick   = this.handleClick.bind(this)
    }

    render() {
        const {isActive, threadMonitor: {newPosts, threads}} = this.props

        return <HeaderPanel isActive={isActive} className="watch-panel">
            {this.renderDescription(threads)}
            <Scrollable className="tilt-container">
                {this.renderMonitoredThreads(threads)}
            </Scrollable>
        </HeaderPanel>
    }

    renderDescription(tm) {
        return !tm.length ? (
            <div className="description">
                Threads that are being watched will appear here. 
                To add a thread, click on the watch button in an open thread. 
            </div>
        ) : false
    }
    // <div className="watch-title"><h4>Watch List</h4></div>


    renderMonitoredThreads(threads) {

        const uniqueBoards = threads
            .map( thread => thread.boardID )
            .filter((value, index, self) => self.indexOf(value) === index)

        console.warn("uniqueBoards", uniqueBoards);

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
            updateInterval={this.props.settings.threadUpdateInterval.value} 
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
        // this.props.unmonitorThread(threadID)
    }

    handleClick({boardID, threadID}) {
        console.log('Fetching thread');
        const {fetchThread, closeThread, status} = this.props
        closeThread({
            threadID: status.threadID,
            callback: () => {
                console.log("handleClick callback!")
                fetchThread(boardID, threadID)
            }
        })
    }
}



function WatchItem(props){
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

    const postClasses = classNames("new-posts", {
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
                    <Icon name="close"/>
                </div>
                <div className="watch-update" onClick={onUpdate}>
                    <Icon name="update"/>
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
