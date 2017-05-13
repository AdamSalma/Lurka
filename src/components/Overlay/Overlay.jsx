import './Overlay.styles'
import React from 'react';
import cx from 'classnames';

const Overlay = ({ isVisible=true, className, children, ...restProps }) => {
    return <div className={cx("Overlay", className, {
        "Overlay-active": isVisible
    })} {...restProps}>
        {children}
    </div>
}

Overlay.defaultProps = {
    isVisible: true
}

export default Overlay
