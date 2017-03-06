import React from 'react'
import { Icon, ButtonCircle } from '~/components'

export default function(props) {
    const {
        monitorThread, unmonitorThread,
        thread:{
            isActive, 
            posts, 
            receivedAt, 
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
        receivedAt,
        didInvalidate,
        op: threadHasPosts && posts[0],
        totalPosts: posts.length,
        lastReplyAt: threadHasPosts && posts[posts.length-1].time
    }

    return <ButtonCircle toggleProps={toggledProps}>
        <Icon {...defaultProps}/> 
    </ButtonCircle>
}
