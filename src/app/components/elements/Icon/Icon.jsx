import React from 'react';
import classes from 'classnames'

const packName = Lurka.iconPackName;

export default function ( props ) {
    // add default class prefix eg 'mdi mdi-icon'
    const iconName = props.name ? `${packName} ${packName}-${props.name}` : ``
    const newProps = Object.assign({}, props, {
        className: classes('Icon', props.className, iconName)
    })

    return <span {...newProps}/>
}
