import React from 'react';
import cx from 'classnames';

import './styles';

export const Area = ({ className, children }) => {
    return (
        <div className="SidePulloutArea">
            {children}
        </div>
    );
};

Area.displayName = 'SidePulloutArea';


export const Item = ({ className, children, position, ...restProps }) => {
    const classes = cx("SidePulloutItem", className, {
        "left": position === "left",
        "right": position === "right"
    });

    return (
        <div className={classes} {...restProps}>
            {children}
        </div>
    );
};

Item.displayName = 'SidePulloutItem';


export const Handle = ({ className, children, position }) => {
    const classes = cx("SidePulloutHandle");

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Handle.displayName = 'SidePulloutHandle';


export const Content = ({ className, children }) => {
    const classes = cx("SidePulloutContent", className);

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Content.displayName = 'SidePulloutContent';
