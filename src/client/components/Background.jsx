import React from 'react';
import classes from 'classnames';

export default ({ isActive, onClick }) => {
    const backgroundClasses = classes("background", {
        "background-active": isActive
    })
    
    return (
        <div
            className={backgroundClasses}
            onClick={onClick}
        ></div>
    )
}
