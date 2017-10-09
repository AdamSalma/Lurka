import React from 'react';
import cx from 'classnames';
import './styles'

export const Area = ({children, className}) => (
    <div className={cx("ParallaxArea", className)}>
        {children}
    </div>
)

Area.displayName = 'ParallaxArea';


export const Foreground = ({children, className}) => (
    <div className={cx("ParallaxForeground", className)}>
        {children}
    </div>
)

Foreground.displayName = 'ParallaxForeground';


export const Background = ({children, className}) => (
    <div className={cx("ParallaxBackground", className)}>
        {children}
    </div>
)

Background.displayName = 'ParallaxBackground';
