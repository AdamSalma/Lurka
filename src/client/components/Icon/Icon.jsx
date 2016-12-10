import React from 'react';
import classNames from 'classnames'

export default function ( props ) {
    const newProps = Object.assign({}, props, {
        className: classNames('icon', props.className)
    })

    return <span {...newProps}/>
}
