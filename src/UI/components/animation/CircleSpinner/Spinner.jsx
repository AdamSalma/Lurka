import './Spinner.styles'
import React from 'react';
import classes from 'classnames';

export default ({ isSpinning=true, className }) => {
    const spinnerClasses = classes("Spinner2", className, {
        "Spinner-active": isSpinning
    })

    return (
        <div className={spinnerClasses}>
            <div className="double-bounce1"/>
            <div className="double-bounce2"/>
        </div>
    )
}
