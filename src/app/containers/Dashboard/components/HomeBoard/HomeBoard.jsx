import React, { PropTypes } from 'react';
import cx from 'classnames';

import {Icon} from '~/components';

import './HomeBoard.styles';

const i = Lurka.icons;

const HomeBoard = ({ className, onClick, homeBoard }) => {
    return (
        <div className={cx('HomeBoard', className)}>
            <div className='HomeBoard__container'>
            { !!homeBoard ? (
                <span className="HomeBoard__boardName">
                    {homeBoard}
                </span>
            ) : (
                <Icon className="HomeBoard__icon" name={i.home}/>
            )}
            </div>
        </div>
    );
};

HomeBoard.displayName = 'HomeBoard';

HomeBoard.propTypes = {
    className: PropTypes.string,
};

export default HomeBoard;
