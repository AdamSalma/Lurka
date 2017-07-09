import React from 'react';
import classes from 'classnames'

const { iconPackName } = window.appSettings;

export default function ( props ) {
    // add default prefix eg 'mdi mdi-icon'
    const iconName = props.name ? `${iconPackName} ${iconPackName}-${props.name}` : ``
    const newProps = Object.assign({}, props, {
        className: classes('Icon', props.className, iconName)
    })

    return <span {...newProps}/>
}
