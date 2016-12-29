import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Thread from "../components/Thread";

// Actions
import { closeThread } from '../actions/ThreadActions';

class ThreadPanel extends Component {
    render() {
        const { closeThread, status, thread } = this.props;

        return (
            <div className="page page-thread">
                <Thread 
                    closeThread={closeThread}

                    thread={thread} isActive={thread.isActive} 
                    isFetching={thread.isFetching} threadID={status.threadID}
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
        closeThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPanel)
