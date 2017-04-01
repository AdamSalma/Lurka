import './Overlay.styles'
import React from 'react';
import classes from 'classnames';

export default ({ isVisible=true, className, ...restProps }) => {
    const overlayClasses = classes("overlay", className, {
        "overlay-active": isVisible
    })
    
    return <div className={overlayClasses} {...restProps}/>
}
