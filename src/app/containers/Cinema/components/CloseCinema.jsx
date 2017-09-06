import React from 'react';
import cx from 'classnames';
import * as components from '~/components'

const i = window.appSettings.icons;

const CloseCinema = ({ className, onClick }) => {
    return (
        <div className={cx('CloseCinema', className)} onClick={onClick}>
            <components.Icon name={i.cinemaClose}/>
        </div>
    );
};

CloseCinema.displayName = 'CloseCinema';

export default CloseCinema;
