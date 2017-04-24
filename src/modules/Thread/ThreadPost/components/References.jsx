import React from 'react'
import {Icon, Line} from '~/components'

const References = ({ refs }) => {
    return refs && refs.length ? <div className='references'>
        <Line/>
        <span className="reference-header">
            <span className="reply-count">({refs.length}) </span>
            <Icon name="account-multiple"/>
        </span>
        {refs.map( ref =>
            <span key={ref} className="quote">
                <a className="quotelink" href={`#p${ref}`}>
                    {`>>${ref}`}
                </a>
            </span>
        )}
    </div> : null
}

References.displayName = 'References';

export default References;
