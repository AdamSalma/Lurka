import './Logo.styles'
import React from "react"
import cx from 'classnames'

const Logo = ({ className }) => (
    <div className={cx("Logo", className)}>
        <img className="Logo__content" src={require('./lurka.svg')} alt="logo"/>
    </div>
)

export default Logo
