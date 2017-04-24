import React, { PropTypes } from 'react';
import cx from 'classnames'

const Radio = ({ isActive }) => {
    return (
        <div className={cx('Radio', {
            'Radio--active': isActive
        })}>
            <div className="Radio__circle"/>
        </div>
    );
};

Radio.displayName = 'Radio';

export default Radio;
