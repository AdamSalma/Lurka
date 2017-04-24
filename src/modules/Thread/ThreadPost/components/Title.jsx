import React from 'react'
import { setHTML } from '~/utils'

const Title = ({ title }) => {
    return title ? (
        <span className='title'>
            <strong {...setHTML(title)}/>
            <span className='pipe'/>
        </span>
    ) : null
}

Title.displayName = 'Title'

export default Title
