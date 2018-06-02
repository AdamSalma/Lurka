import React, {PropTypes} from 'react';
import cx from 'classnames';

import './BoardListItem.styles';

const BoardListItem = ({ className, title, description, info, onClick }) => {
    return (
        <div className={cx('BoardListItem', className)} onClick={onClick}>
            <div className="BoardListItem__title-wrap">
                <div className='BoardListItem__title'>{title}</div>
            </div>
            <div className="BoardListItem__metadata-wrap">
                <div className='BoardListItem__description'>{description}</div>
                <div className='BoardListItem__tags'>
                    <div className='BoardListItem__tag'>Some metadata</div>
                    <div className='BoardListItem__tag'>18+</div>
                    <div className='BoardListItem__tag'>Archived</div>
                </div>
            </div>
        </div>
    );
};

BoardListItem.displayName = 'BoardListItem';

BoardListItem.propTypes = {
    className: PropTypes.string,
};

export default BoardListItem;
