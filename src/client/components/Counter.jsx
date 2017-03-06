import React from 'react';
import classes from "classnames";

export default ({value, className}) => {
    const counterClasses = classes(className, "counter")
    return (
        <div className={counterClasses}>
            <span>{value}</span>
        </div>
    )
}
