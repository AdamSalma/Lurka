import React from 'react';
import classes from 'classnames';

export default ({ isVisible, closeBackground }) => {
    const backgroundClasses = classes("background", {
        "background-active": isVisible
    })
    
    return (
        <div
            className={backgroundClasses}
            onClick={closeBackground}
        ></div>
    )
}
