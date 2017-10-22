import './Notification.styles'
import React from 'react';
import cx from 'classnames'

const Notification = ({ className, children, number=0 }) => {
    const notifClass = cx('Notification__content', className, {
        'Notification__content--active': number > 0
    })
    return (
        <div className="Notification">
            <div className={notifClass}>
                {number}
            </div>
            {children}
        </div>
    );
};

Notification.displayName = 'Notification';

export default Notification;
