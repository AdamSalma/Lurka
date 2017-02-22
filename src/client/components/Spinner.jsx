import React from 'react';
import classNames from 'classnames';

export default ({ isSpinning=true }) => {
    const spinnerClasses = classNames("spinner", {
        "spinner-active": isSpinning
    })

    return <div className={spinnerClasses}/>
}
