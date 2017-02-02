import React from 'react';
import classNames from 'classnames'

const iconPack = "mdi"

export default function ( props ) {
    // add default prefix eg 'mdi mdi-icon'
    const iconName = props.name ? `${iconPack} ${iconPack}-${props.name}` : ``
    const newProps = Object.assign({}, props, {
        className: classNames('icon', props.className, iconName)
    })

    return <span {...newProps}/>
}
