import './Spinner.styles'
import React from 'react';
import cx from 'classnames';

export default ({ isSpinning=true, className }) => {
    const spinnerClasses = cx("VideoSpinner", className, {
        "Spinner-active": isSpinning
    })

    return <div className={spinnerClasses}/>
}
