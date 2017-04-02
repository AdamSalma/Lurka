import React, {Component} from 'react'
import {
    Overlay,
    Spinner
} from '~/components'



const threadConnect = (ThreadComponent) => {
    const ThreadHOC = (props) => {
        const {isActive, thread:{posts}, closeThread} = props
        return (
            <div className="ThreadHOC">
                <Overlay 
                    isVisible={isActive} 
                    onClick={closeThread}
                />
                <Spinner isSpinning={isActive && !posts.length}/>
                <ThreadComponent {...props} />
            </div>
        )
    }

    return ThreadHOC
}

export default threadConnect
