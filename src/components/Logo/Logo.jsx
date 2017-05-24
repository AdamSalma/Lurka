import './Logo.styles'
import React from "react"
import classes from 'classnames'

const Logo = () => (
    <div className="Logo">
        <img className="Logo__content" src={require('./lurka.svg')} alt="logo"/>
    </div>
)

export default Logo
