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
            status, thread 
        } = this.props;

        return (
            <div className="page page-thread">
                <Thread 
                    closeThread={closeThread} scrollHeader={scrollHeader}

                    thread={thread} isActive={thread.isActive} 
                    isFetching={thread.isFetching} threadID={status.threadID}
                />
                <ThreadControls
                    monitorThread={monitorThread} unmonitorThread={unmonitorThread}
                    toggleHeaderPanel={toggleHeaderPanel}

                    thread={thread} status={status}
                />
            </div>
        )
    }
}


function mapStateToProps({ status, thread }) {
    return {
        status,
        thread
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
