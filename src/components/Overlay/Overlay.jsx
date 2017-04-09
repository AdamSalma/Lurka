import './Overlay.styles'
import React from 'react';
import classes from 'classnames';

export default ({ isVisible=true, className, ...restProps }) => {
    const overlayClasses = classes("Overlay", className, {
        "Overlay-active": isVisible
    })
    
    return <div className={overlayClasses} {...restProps}/>
}
