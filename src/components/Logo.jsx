import React from "react"
import classes from 'classnames'

export default function ({ className }) {
    const logoClasses = classes("logo", className);

    return (
        <div className="logo-wrap">
            <img src='./logo.png' className={logoClasses}/>
        </div>      
    )
}
