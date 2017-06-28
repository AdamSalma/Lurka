import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './HomeBoard.styles';

const i = window.appSettings.icons;

class HomeBoard extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className, homeBoard} = this.props;
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
    }
}

export default HomeBoard;
