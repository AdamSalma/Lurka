import './Spinner.styles'
import React from 'react';
import classes from 'classnames';

export default ({ isSpinning=true, className}) => {
    const spinnerClasses = classes("Spinner", className, {
        "Spinner-active": isSpinning
    })

    return <div className={spinnerClasses}/>
}
