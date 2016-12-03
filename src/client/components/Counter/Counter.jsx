import React from 'react';
import classNames from "classnames";

export default ({value, className}) => {
    const classes = classNames(className, "counter")
    return (
        <div className={classes}>
            <span>{value}</span>
        </div>
    )
}
