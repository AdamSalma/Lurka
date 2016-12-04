import React from "react"
import classNames from 'classnames'

export default function ({ className }) {
    const classes = classNames("logo", className);

    return (
        <div className="logo-wrap">
            <img src='./logo.png' className={classes}/>
        </div>      
    )
}
