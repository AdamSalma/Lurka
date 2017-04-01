import React from 'react'
import {name, version} from "~/../../package.json"


export default () => {
    return <div className="logo-text">
        <div className="name">{name}</div> 
        <div className="version">v{version}</div>
    </div>
}
