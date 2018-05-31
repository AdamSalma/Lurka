import React from 'react';
import cx from 'classnames';
import { Line } from '~/components'

export const ContextMenu = ({ className, children, ...restProps }) => {
    return (
        <div className={cx('ContextMenu', className)} {...restProps}>
            {children}
        </div>
    );
};

ContextMenu.displayName = 'ContextMenu';

export const ContextMenuItem = ({ className, children, ...restProps }) => {
    return (
        <div className={cx('ContextMenuItem', className)} {...restProps}>
            {children}
        </div>
    );
};

ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuSeperator = ({ className, children }) => {
    return (
        <Line className={cx("ContextMenuSeperator", className)}/>
    );
};

ContextMenuSeperator.displayName = 'ContextMenuSeperator';

export const ContextMenuHeader = ({ className, children, ...restProps }) => {
    return (
        <div className={cx('ContextMenuHeader', className)} {...restProps}>
            {children}
        </div>
    );
};

ContextMenuHeader.displayName = 'ContextMenuHeader';

