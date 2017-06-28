import React from 'react'
import { setHTML } from '~/utils/react'

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
