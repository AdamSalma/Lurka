import React, {Component} from 'react'
import {
    Overlay,
    Spinner
} from '~/components'

const threadConnect = (ThreadComponent) => {
    const ThreadHOC = (props) => {
        const {isThreadOpen, posts, closeThread} = props

        console.log(props)
        return (
            <div className="Thread">
                <Overlay
                    isVisible={isThreadOpen}
                    onClick={closeThread}
                />
                <Spinner isSpinning={isThreadOpen && !posts.length}/>
                <ThreadComponent {...props} />
            </div>
        )
    }

    return ThreadHOC
}

export default threadConnect
