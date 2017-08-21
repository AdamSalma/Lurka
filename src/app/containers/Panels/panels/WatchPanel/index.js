import './styles'
import React, {Component} from 'react'
import cx from 'classnames'
import connect from './connect';

import WatchEntity from './WatchEntity'
import { SlideTransition } from '../../components'
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

    render() {
        const { queue } = this.props

        const watchClass = cx('WatchPanel', {
            'show-description': !queue || !queue.length,
        });

        return (
            <div>
            <SlideTransition effect="from top" ref={this.setTransitionerRef} className={watchClass}>
                <div className="watch-title"><h3>Thread Watcher</h3></div>
                <div className="description">
                    Get notified when a thread updates! (and when you are replied to)
                </div>
                <Scrollable className="tilt-container">
                    {this.renderWatchEntityGroups(queue)}
                </Scrollable>
            </SlideTransition>
            </div>
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

        return <WatchEntity
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
        this.props.updateMonitoredThread(thread)
    }

    handleUnwatch (threadID, event) {
        console.log("handleUnwatch");
        this.props.unmonitorThread(threadID)
    }

    handleClick ({boardID, threadID}) {
        console.log('Fetching thread');
        const {fetchThread, closeThread, status} = this.props
        closeThread(() => fetchThread(boardID, threadID))
    }
}

export default connect(WatchPanel)
