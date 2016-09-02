import React from 'react';
import classNames from 'classnames';

export default ({ isSpinning }) => {
    const spinnerClasses = classNames({
        "spinner": true,
        "spinner-active": isSpinning
    })
    return (
        <div className={spinnerClasses}></div>
    )
}
