import React from 'react'
import { Icon, ButtonCircle } from '~/components'

export default function(props) {
    console.log("WatchController");
    const {
        monitorThread, unmonitorThread,
        thread:{
            isActive, 
            posts, 
            requestedAt, 
            didInvalidate
        }, 
        status: {
            threadID, 
            boardID
        },
    } = props;

    const threadHasPosts = posts && posts.length > 0

    const toggledProps = {
        name:"eye", 
        onClick: () => unmonitorThread(threadID)
    }

    const defaultProps = {
        name:"eye",
        onClick: () => monitorThread(monitorArgs)
    }

    const monitorArgs = {
        boardID, 
        threadID,
        requestedAt,
        didInvalidate,
        op: threadHasPosts && posts[0],
        totalPosts: posts.length,
        lastReplyAt: threadHasPosts && posts[posts.length-1].time
    }

    console.log("WatchController Returing...");
    return <ButtonCircle toggleProps={toggledProps}>
        <Icon {...defaultProps}/> 
    </ButtonCircle>
}
