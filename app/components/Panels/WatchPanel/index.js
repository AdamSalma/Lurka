import './styles'
import React, {Component} from 'react'
import cx from 'classnames'
import connect from './connect';

import WatchEntity from './WatchEntity'
import { SlideTransition } from '../components'
import {
    Timer,
    TimeAgo,
    Icon,
    Line,
    Scrollable,
    Button
} from '~/components/UI'
import { emitThreadClose, emitSettingsToggle, emitPostToggle } from "~/events";

const i = Lurka.icons


export class WatchPanel extends Component {

    // Used by parent to control UI
    show = (args) => {
        this.transitioner.show(args);
        emitPostToggle({ override: false });
        emitSettingsToggle(true)
    }
    hide = (args) => {
        this.transitioner.hide(args);
        emitSettingsToggle(false)
    }
    setTransitionerRef = (ref) => this.transitioner = ref;

    render() {
        const { queue } = this.props

        const watchClass = cx('WatchPanel', {
            'show-description': !queue || !queue.length,
        });

        return <SlideTransition effect="from right" ref={this.setTransitionerRef} className={watchClass}>
            <div className="watch-title">
              <h3>Thread Watcher</h3>
            </div>
            <div className="description">
              No posts are currently being watched
            </div>
            <Button onClick={emitSettingsToggle} value="hello" />
            <Scrollable className="tilt-container">
              {this.renderWatchEntityGroups(queue)}
              <div className="Controls">
                controls here
                <h4> oi</h4>
              </div>
            </Scrollable>
          </SlideTransition>;

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

    handleUpdate (entity) {
        console.log("handleUpdate");
        this.props.updateMonitoredThread(entity)
    }

    handleUnwatch (entityId) {
        console.log("handleUnwatch");
        this.props.unmonitorThread(entityId)
    }

    handleClick (entity) {
        const id = entity.id.split('/');
        const boardID = id[0];
        const threadID = id[1];

        console.warn(boardID, threadID);

        console.log('Fetching watchpanel thread. Board:', boardID, "Thread:", threadID);
        emitThreadClose(() => this.props.fetchThread({boardID, threadID, noCache: true}))
    }
}

export default connect(WatchPanel)
