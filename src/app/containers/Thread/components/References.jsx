import React from 'react'
import {Icon, Line} from '~/components'

const i = Lurka.icons;

const References = ({ refs }) => {
    return refs && refs.length ? <div className='references'>
        <Line/>
        <span className="reference-header">
            Replies ({refs.length})
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
