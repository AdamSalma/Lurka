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
        this.handleTimerEnd = this.handleTimerEnd.bind(this)
        this.renderWatchItem = this.renderWatchItem.bind(this)
    }

    render() {
        const {isActive, threadMonitor: {newPosts, threads}} = this.props

        return <HeaderPanel isActive={isActive} className="watch-panel">
            <div className="watch-header">
                <h4>Watch List</h4>
            </div>
            {this.renderDescription(threads)}
            <Scrollable>
                {this.renderMonitoredThreads(threads)}
            </Scrollable>
        </HeaderPanel>
    }

    renderDescription(tm) {
        return !tm.length ? (<span>
            Threads that are being watched will appear here. 
            To add a thread, click on the watch button in an open thread. 
        </span>) : false
    }

    renderMonitoredThreads(threads) {

        const uniqueBoards = threads
            .map( thread => thread.boardID )
            .filter((value, index, self) => self.indexOf(value) === index)

        console.warn("uniqueBoards", uniqueBoards);

        return uniqueBoards.map( uniqueBoard => {
            return (
                <div className="watch-group" key={uniqueBoards}>
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
        const updateInterval = this.props.settings.threadUpdateInterval.value
        const { newPosts=0, threadID, boardID, didInvalidate, op: { title, media, comment, time } } = thread;

        console.warn("renderWatchItem()")
        return (
            <div key={threadID} className="watch-item">
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
                        <div className="watch-stats">
                            <div className="timeago">
                                <TimeAgo time={time}/>
                            </div>
                            <div className={"new-posts "+(newPosts>0) ? "active":""}>
                                <span>{newPosts}</span>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="watch-close" 
                     onClick={this.props.unmonitorThread.bind(null, threadID)}>
                    <Icon name="close"/>
                </div>
                <Timer 
                    displayCounter={false}
                    seconds={updateInterval}
                    autorestart={true} 
                    active={!didInvalidate}
                    onTimerEnd={this.handleTimerEnd.bind(null, thread)}
                />
                <Line/>
            </div>
        )
    }

    handleTimerEnd(thread) {
        this.props.updateMonitoredThread(thread)
    }
}
