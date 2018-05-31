import React from 'react';
import cx from 'classnames';

export const BarSlideTab = ({ children, isActive }) => (
    <div className={cx('Tab', 'BarSlideTab', isActive && "active")}>
        {children}
    </div>
)
