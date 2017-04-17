import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Thread, 
    ThreadControls
} from "~/modules";

import { 
    closeThread,
    monitorThread,
    unmonitorThread,
    scrollHeader,
    toggleHeaderPanel
} from '~/redux/actions';

class ThreadPage extends Component {
    render() {
        const { 
            // Actopms
            closeThread, monitorThread, unmonitorThread,

            // Props
            status, thread, display
        } = this.props;

        return (
            <div className="page page-thread">
                <Thread 
                    closeThread={closeThread} scrollHeader={scrollHeader}

                    thread={thread} isActive={display.isThreadOpen} 
                    isFetching={thread.isFetching} threadID={status.threadID}
                    isDrawerOpen={display.isDrawerOpen}
                />
                <ThreadControls
                    monitorThread={monitorThread} unmonitorThread={unmonitorThread}
                    toggleHeaderPanel={toggleHeaderPanel}

                    thread={thread} status={status} {...display}
                />
            </div>
        )
    }
}


function mapStateToProps({ status, thread, display }) {
    return {
        status,
        thread,
        display
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeThread,
        monitorThread,
        unmonitorThread,
        scrollHeader,
        toggleHeaderPanel
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPage)
