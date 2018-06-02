import './Logo.styles'
import React from "react"
import cx from 'classnames'
import logo from '-/public/images/logo.svg'

const Logo = ({ className }) => (
    <div className={cx("Logo", className)}>
        <img className="Logo__content" src={logo} alt="logo"/>
    </div>
)

export default Logo
