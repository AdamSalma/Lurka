import React from 'react';
import cx from 'classnames';
import * as components from '~/components/UI'

const i = Lurka.icons;

const CloseCinema = ({ className, onClick }) => {
    return (
        <div className={cx('CloseCinema', className)} onClick={onClick}>
            <components.Icon name={i.cinemaClose}/>
        </div>
    );
};

CloseCinema.displayName = 'CloseCinema';

export default CloseCinema;
