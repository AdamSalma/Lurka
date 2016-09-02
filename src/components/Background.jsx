import React from 'react';
import classNames from 'classnames';

export default ({ isVisible, onThreadClose }) => {
    const backgroundClasses = classNames({
        "background": true,
        "background-active": isVisible
    })
    return (
        <div
            className={backgroundClasses}
            onClick={onThreadClose}>
        </div>
    )
}
