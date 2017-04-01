import './Spinner.styles'
import React from 'react';
import classes from 'classnames';

export default ({ isSpinning=true }) => {
    const spinnerClasses = classes("spinner", {
        "spinner-active": isSpinning
    })

    return <div className={spinnerClasses}/>
}
