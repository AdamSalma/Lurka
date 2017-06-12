import React from 'react'
import { Icon, ButtonCircle } from '~/components'

export default function(props) {
    // const {
    //     monitorThread, unmonitorThread, toggleHeaderPanel,
    //     thread:{
    //         isActive,
    //         posts,
    //         receivedAt,
    //         didInvalidate
    //     },
    //     status: {
    //         threadID,
    //         boardID
    //     }
    // } = props;

    // const threadHasPosts = posts && posts.length > 0

    // const toggledProps = {
    //     name:"eye",
    //     onClick: () => unmonitorThread(threadID)
    // }

    // const defaultProps = {
    //     name:"eye",
    //     onClick: () => {
    //         toggleHeaderPanel({panel:'watch', panelState:true})  // true means always keep open
    //         // monitorThread(monitorArgs)
    //     }
    // }

    // const monitorArgs = {
    //     boardID,
    //     threadID,
    //     receivedAt,
    //     didInvalidate,
    //     op: threadHasPosts && posts[0],
    //     totalPosts: posts.length,
    //     lastReplyAt: threadHasPosts && posts[posts.length-1].time
    // }

    return <ButtonCircle>
        <Icon name="eye-2" />
    </ButtonCircle>
}
        // <Icon name="eye" {...defaultProps}/>
