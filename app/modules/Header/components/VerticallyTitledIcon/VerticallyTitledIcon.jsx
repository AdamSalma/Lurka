import React from 'react';
import cx from 'classnames';
import './VerticallyTitledIcon.styles';

import {Icon} from '~/components';

export default function VerticallyTitledIcon ({ title, children, className }) {
    return <div className={cx("VerticallyTitledIcon", className)}>
        {children}
        <span>{title}</span>
    </div>
}
